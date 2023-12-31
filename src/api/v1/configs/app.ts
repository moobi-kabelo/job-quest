/**
 * @fileoverview Express application setup and configuration with request logging.
 * @version 1.0.0
 * @since 2023-12-31
 * @module app
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Application = express();

// Middleware setup
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static('docs'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(helmet());

export { app };
