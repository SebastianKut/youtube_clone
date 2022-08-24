import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from './logger';

const DB_CONNECTION =
  config.db_connection || 'mongodb://localhost:27017/youtube-clone';

console.log('Database connection', DB_CONNECTION);
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION);
    logger.info('Connected to database');
  } catch (error) {
    logger.error(error, 'Failed to connect to database');
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  await mongoose.connection.close();
  logger.info('Disconnected from database');
  return;
};
