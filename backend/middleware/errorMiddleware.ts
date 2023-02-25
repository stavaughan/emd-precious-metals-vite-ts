import type { NextFunction, Request, Response } from 'express';

import messages from '../utils/messages';
import statusCodeMessages from '../utils/statusCodes';

const statusCodes = Object.keys(statusCodeMessages);
const codeCheck = (code: number) => statusCodes.includes(`${code}`);
const getMessage = (code: number) =>
  statusCodeMessages[`${code}` as keyof typeof statusCodeMessages];

const errorText = (statusCode: number, errMessage: string) => {
  const stack: string = new Error().stack || '';
  const message = errMessage || getMessage(statusCode);
  return `${message} - ${stack}`;
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (
    (err?.message && codeCheck(res.statusCode)) ||
    codeCheck(res.statusCode)
  ) {
    return res.status(res?.statusCode).send({
      message: errorText(res.statusCode, err?.message),
    });
  }

  if (res.statusCode === 404) {
    res.status(404);
    res.format({
      html: () => res.type('html').send(messages.noAccess()),
      json: () => res.json({ error: messages.notFoundJSON }),
      default: () => res.type('txt').send(messages.notFoundText),
    });
  }

  res.status(res?.statusCode).send({
    message: errorText(res.statusCode, err?.message),
  });

  throw new Error(err?.message);
};
