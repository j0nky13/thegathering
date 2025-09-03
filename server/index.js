import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { RateLimiterMemory } from "rate-limiter-flexible";

dotenv.config();

const app = express();
app.use(helmet());

// Allow CORS from configured origin; default to true (reflect request origin) during setup
const allowedOrigin = process.env.CORS_ORIGIN || process.env.ORIGIN || true;
app.use(
  cors({
    origin: allowedOrigin,
    credentials: false,
  })
);
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
// Accept either MONGO_* or MONGODB_* env keys; fall back to sensible defaults
const dbName = process.env.MONGO_DB || process.env.MONGODB_DB || "subscribers";
const colName = process.env.MONGO_COLLECTION || process.env.MONGODB_COLLECTION || "subscribers";

if (!mongoUri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

let client;
let collection;

// Simple rate limit: 5 requests / 60s per IP
const limiter = new RateLimiterMemory({ points: 5, duration: 60 });

// --- robust Mongo init with retry; never crash the process on boot ---
async function initMongoWithRetry() {
  const maxRetries = 12; // exponential backoff, capped
  let attempt = 0;
  while (!collection && attempt < maxRetries) {
    try {
      client = new MongoClient(mongoUri);
      await client.connect();
      collection = client.db(dbName).collection(colName);
      await collection.createIndex({ email: 1 }, { unique: true });
      console.log(`✅ Mongo connected. db='${dbName}', collection='${colName}'`);
      break;
    } catch (err) {
      attempt++;
      console.error(`❌ Mongo connect failed (attempt ${attempt}): ${err?.message}`);
      const backoff = Math.min(30000, 1000 * 2 ** attempt); // cap at 30s
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  if (!collection) {
    console.error("⚠️  Mongo not connected after retries; API will run but writes will 503 until DB is up.");
  }
}

// Health check endpoints for DigitalOcean probes
// Always respond 200 with plain text "OK" for /health and /
app.get("/health", (_req, res) => {
  res.status(200).type("text/plain").send("OK");
});

app.get("/", (_req, res) => {
  res.status(200).type("text/plain").send("OK");
});

// Health checks — always 200 so DO readiness passes; simplified response
app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true });
});
app.get("/api/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});

// TEMP: sanity route so we can verify ingress actually reaches this component
app.get("/api/subscribe", (_req, res) => {
  res.status(200).json({ ok: false, note: "Use POST to /api/subscribe" });
});

// Explicit preflight for some strict proxies/CDNs
app.options("/api/subscribe", cors());

app.post("/api/subscribe", async (req, res) => {
  try {
    if (!collection) return res.status(503).json({ ok: false, error: "DB unavailable" });

    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
    await limiter.consume(ip).catch(() => {
      throw new Error("Too many");
    });

    const { email } = req.body || {};
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    const now = new Date();
    await collection.updateOne(
      { email: email.toLowerCase() },
      { $setOnInsert: { email: email.toLowerCase(), createdAt: now }, $set: { updatedAt: now } },
      { upsert: true }
    );

    return res.json({ ok: true });
  } catch (err) {
    if (err.message === "Too many") return res.status(429).json({ ok: false, error: "Rate limited" });
    console.error(err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

const port = process.env.PORT || 8080;
initMongoWithRetry().catch((err) => console.error("Init error:", err));
app.listen(port, "0.0.0.0", () => console.log(`Subscribe API listening on ${port}`));

// Last: log any unmatched route so we can see what path DO forwarded
app.use((req, res) => {
  console.warn("[404]", req.method, req.originalUrl);
  res.status(404).json({ ok: false, error: "Not found" });
});

process.on("SIGTERM", async () => {
  try {
    await client?.close();
  } catch {}
  process.exit(0);
});