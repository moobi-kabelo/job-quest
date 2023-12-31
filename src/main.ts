/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview Server setup and configuration.
 * @version 1.0.0
 * @since 2023-12-31
 * @module server
 */

import dotenv from 'dotenv';
import http from 'http';
import ip from 'ip';
import os from 'os';

import { app } from './api/v1/configs';
import { Database } from './api/v1/libs';
import { SystemLogger } from './api/v1/utils';
dotenv.config();

const PORT: string | number = process.env.PORT ?? 5500;

/**
 * The HTTPS server instance.
 * @type {http.Server}
 */
const server: http.Server = http.createServer(app);

// Error handling for address in use
server.on('error', (e: any) => {
  if (e.code === 'EADDRINUSE') {
    SystemLogger.error('Address in use, retrying...', { ...e });
    setTimeout(() => {
      server.close();
      server.listen(PORT, () => {
        SystemLogger.info('API Started.', {
          server: {
            name: os.hostname(),
            host: `http://${ip.address()}:${PORT}`,
            platform: os.platform(),
          },
        });
      });
    }, 1000);
  }
});

/**
 * Initialize and start the server.
 */
(async (): Promise<void> => {
  try {
    // Connect to the MongoDB database
    const database = new Database();
    await database.connectMongo();

    // Start the HTTP server
    server.listen(PORT, () => {
      SystemLogger.info('API Started.', {
        server: {
          name: os.hostname(),
          host: `http://${ip.address()}:${PORT}`,
          platform: os.platform(),
        },
      });
    });
  } catch (error: any) {
    // Handle database connection errors
    SystemLogger.error('Failed To Establish Connection To Database.', {
      error_name: error.constructor.name,
      error_message: `${error}`,
      error_stack: error.stack,
    });
    process.exit(1);
  }
})();
