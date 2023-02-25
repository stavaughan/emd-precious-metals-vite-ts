import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import fileUpload from 'express-fileupload';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';

import connectDB from './config/db';
import logger from './logger';
import { setCache } from './middleware/cacheControl';
import metalsRouter from './routes/metalsRouter';
import settingsRouter from './routes/settingsRouter';
import messages from './utils/messages';

dotenv.config();

connectDB();

const app = express();
const PREFIX = '/api';

app.set('port', process.env.PORT || 4444);

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();
  res.on('finish', () => {
    const elapsedTime = process.hrtime(startTime);
    const timeInMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;
    logger.log({
      level: 'debug',
      message: `${req.method} ${res.statusCode} ${timeInMs}ms\t${req.path}`,
      consoleLoggerOptions: { label: 'Metals API' },
    });
  });
  next();
});

app.use(fileUpload());

app.use(
  compression({
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  })
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'", 'cdn.jsdelivr.net'],
      'img-src': ["'self'", 'res.cloudinary.com', 'data:', 'blob:'],
    },
  })
);

// Configure headers
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? process.env.DOMAIN_DEV
        : process.env.DOMAIN_PROD,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '50mb',
    extended: true,
  } as any)
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(setCache);

app.use(
  `${PREFIX}/`,
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    store: new MemoryStore(),
  })
);

// Handle Routes
app.use(`${PREFIX}/app-settings`, settingsRouter);
app.use(`${PREFIX}/metals`, metalsRouter);

// TODO: Refactor for production
if (process.env.NODE_ENV === 'development') {
  app.get('/*', (_req, res: Response) => res.send(messages.noAccess()));
} else {
  app.use(
    express.static(path.join(__dirname, '../frontend'), {
      maxAge: 31557600000,
    })
  );
  app.get('/*', (_req, res: Response) => {
    // eslint-disable-next-line no-console
    console.log({
      dirname: __dirname,
      path: path.resolve(__dirname, '../frontend/dist/index.html'),
    });
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

app.use((_req, res: Response) => {
  res.status(404);
  res.format({
    html: () => res.type('html').send(messages.noAccess()),
    json: () => res.json({ error: messages.notFoundJSON }),
    default: () => res.type('txt').send(messages.notFoundText),
  });
});

export { app };
