import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  mongodbUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret'
};
