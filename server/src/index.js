import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config.js';
import logger from './logger.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import healthRouter from './health.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/health', healthRouter);

// error handler
app.use((err, req, res, next) => {
  logger.error(err?.stack || err?.message || err);
  res.status(500).json({ error: err?.message || 'Internal Server Error' });
});

async function start() {
  if (!config.mongodbUri) {
    logger.error('Missing MONGODB_URI in env — exiting');
    process.exit(1);
  }
  await mongoose.connect(config.mongodbUri, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000
  });
  logger.info('Connected to MongoDB');

  const port = config.port;
  app.listen(port, () => logger.info(`Server listening on ${port}`));
}

start().catch(err => {
  logger.error('Failed to start', err);
  process.exit(1);
});
