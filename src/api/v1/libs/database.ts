/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * @version 1.0.0
 * @since 2023-12-31
 * @module database
 */
import mongoose, { Connection } from 'mongoose';
import { Redis } from 'ioredis';
import { databaseConfig } from '../configs';
import { SystemLogger } from '../utils';

export class Database {
  /**
   * Method to connect to MongoDB.
   * @returns {Promise<Connection>}
   * @public
   */
  public async connectMongo(): Promise<Connection> {
    try {
      await mongoose.connect(databaseConfig.mongoUrl);
      return mongoose.connection;
    } catch (error: any) {
      SystemLogger.error('MongoDB Connection Failed.', {
        error_name: error.constructor.name,
        error_message: error.message,
        error_stack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Method to close the MongoDB connection.
   * @returns {Promise<void>}
   * @public
   */
  public async closeMongo(): Promise<void> {
    try {
      return await mongoose.connection.close();
    } catch (error: any) {
      SystemLogger.error('Failed to close MongoDB connection.', {
        error_name: error.constructor.name,
        error_message: error.message,
        error_stack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Method to connect to Redis.
   * @returns {Redis} The Redis client.
   * @public
   */
  public redis(): Redis {
    return new Redis(databaseConfig.redisUrl);
  }
}
