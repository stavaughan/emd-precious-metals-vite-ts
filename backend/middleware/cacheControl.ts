import type { NextFunction, Request, Response } from 'express';

export const setCache = (req: Request, res: Response, next: NextFunction) => {
  // period in seconds
  const period = 60 * 60 * 24;

  if (['GET', 'DELETE', 'POST', 'PATCH', 'PUT'].includes(req.method)) {
    res.set('Cache-control', `no-store`);
  } else {
    res.set('Cache-control', `public, max-age=${period}`);
  }

  next();
};
