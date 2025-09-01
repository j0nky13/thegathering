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
const dbName  = process.env.MONGO_DB || process.env.MONGODB_DB || "subscribers";
const colName = process.env.MONGO_COLLECTION || process.env.MONGODB_COLLECTION || "subscribers";

if (!mongoUri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

let client;
let collection;

// Simple rate limit: 5 requests / 60s per IP
const limiter = new RateLimiterMemory({ points: 5, duration: 60 });

async function init() {
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    collection = client.db(dbName).collection(colName);
    // helpful index (no duplicates)
    await collection.createIndex({ email: 1 }, { unique: true });
    console.log(`Mongo connected. Using db='${dbName}', collection='${colName}'`);
  } catch (err) {
    console.error("Mongo init failed:", err);
    process.exit(1);
  }
}

// health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
    await limiter.consume(ip).catch(() => { throw new Error("Too many"); });

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
await init();
app.listen(port, () => console.log(`Subscribe API listening on ${port}`));

process.on("SIGTERM", async () => {
  try { await client?.close(); } catch {}
  process.exit(0);
});