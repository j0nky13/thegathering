import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { z } from 'zod';

const app = express();
app.use(helmet({ crossOriginResourcePolicy: false })); // keep embeds working
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',').map(s => s.trim()) ?? '*'
}));

// --- DB ---
await mongoose.connect(process.env.MONGODB_URI);

// --- Model ---
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  source: { type: String, default: 'hero-modal' },
  userAgent: String,
  ipHash: String, // optional if you want privacy; hash before saving
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// --- Rate limit (IP based) ---
const limiter = new RateLimiterMemory({ points: 5, duration: 60 }); // 5 req/min

// --- Validation ---
const Body = z.object({
  email: z.string().email().max(254),
  source: z.string().max(64).optional()
});

// --- API ---
app.post('/api/subscribe', async (req, res) => {
  try {
    await limiter.consume(req.ip);
  } catch {
    return res.status(429).json({ ok: false, error: 'Too many requests' });
  }

  const parsed = Body.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  const { email, source } = parsed.data;

  try {
    await Subscriber.updateOne(
      { email: email.toLowerCase() },
      {
        $setOnInsert: {
          email: email.toLowerCase(),
          source: source ?? 'hero-modal',
          userAgent: req.headers['user-agent'] || ''
        }
      },
      { upsert: true }
    );
    return res.json({ ok: true });
  } catch (e) {
    // Duplicate key is fine => already subscribed
    if (e?.code === 11000) return res.json({ ok: true });
    console.error(e);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// --- Health ---
app.get('/api/health', (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('API listening on', port));