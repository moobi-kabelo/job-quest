/**
 * @fileoverview
 * @version 1.0.0
 * @since 2023-12-31
 * @module Logger
 */
import winston, { Logger } from 'winston';
import { loggerConfig } from '../configs';

class LoggerHelper {
  createLogger(): Logger {
    return winston.createLogger({ ...loggerConfig });
  }
}

export const SystemLogger = new LoggerHelper().createLogger();
