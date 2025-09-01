import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { RateLimiterMemory } from "rate-limiter-flexible";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
const dbName   = process.env.MONGODB_DB || "thegathering";
const colName  = process.env.MONGODB_COLLECTION || "subscribers";

if (!mongoUri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const client = new MongoClient(mongoUri); // Node driver handles SRV + pooling
await client.connect();
const collection = client.db(dbName).collection(colName);

// Simple rate limit: 5 requests / 60s per IP
const limiter = new RateLimiterMemory({ points: 5, duration: 60 });

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
app.listen(port, () => console.log(`Subscribe API listening on ${port}`));