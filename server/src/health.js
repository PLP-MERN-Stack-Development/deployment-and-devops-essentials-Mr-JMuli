import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState; // 1=connected
  res.json({ status: dbState === 1 ? 'ok' : 'degraded', dbState, time: new Date().toISOString() });
});

export default router;
