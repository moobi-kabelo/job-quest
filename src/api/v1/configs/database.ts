/**
 * @fileoverview Configuration for database connections.
 * @version 1.0.0
 * @since 2023-12-31
 * @module databaseConfig
 */

interface DatabaseConfig {
  mongoUrl: string;
  redisUrl: string;
}

const { NODE_ENV, MONGO_DB_URL, REDIS_UPSTASH_URL } = process.env;

/**
 * Multiple database configurations, one for development and one for production.
 * @type {DatabaseConfig}
 */
export const databaseConfig: DatabaseConfig = {
  mongoUrl:
    NODE_ENV !== 'development'
      ? MONGO_DB_URL
      : 'mongodb://127.0.0.1:27017/job-quest',
  redisUrl:
    NODE_ENV !== 'development' ? REDIS_UPSTASH_URL : 'redis://127.0.0.1:6379',
};
