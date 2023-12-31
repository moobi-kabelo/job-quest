/**
 * @fileoverview Configuration for the logger setup.
 * @version 1.0.0
 * @since 2023-12-31
 * @module loggerConfig
 */

import dotenv from 'dotenv';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import winston from 'winston';

dotenv.config();

const { NODE_ENV, LOGTAIL_ACCESS_TOKEN } = process.env;

interface CustomLoggerConfig {
  transports:
    | LogtailTransport[]
    | winston.transports.ConsoleTransportInstance[];
}

/**
 * Logger configuration object.
 * @type {CustomLoggerConfig}
 */
export const loggerConfig: CustomLoggerConfig = {
  transports:
    NODE_ENV !== 'development'
      ? [
          new LogtailTransport(
            new Logtail(LOGTAIL_ACCESS_TOKEN || 'yP7k6VZpeyLDEfwrR3r5wWFC')
          ),
        ]
      : [
          new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
              winston.format.json(),
              winston.format.prettyPrint()
            ),
          }),
        ],
};
