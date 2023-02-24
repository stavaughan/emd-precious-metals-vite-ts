import type { NextFunction, Request, Response } from 'express';

import messages from '../utils/messages';

const responseTypeMessage = (statusCode?: number) => {
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 401:
      return messages.unauthorized;
    case 403:
      return messages.noAccess();
    case 404:
      return messages.notFoundJSON;
    case 405:
      return 'Method Not Allowed';
    case 406:
      return 'Not Acceptable';
    case 408:
      return 'Request Timeout';
    case 409:
      return 'Conflict';
    case 410:
      return 'Gone';
    case 411:
      return 'Length Required';
    case 412:
      return 'Precondition Failed';
    case 413:
      return 'Payload Too Large';
    case 414:
      return 'URI Too Long';
    case 415:
      return 'Unsupported Media Type';
    case 416:
      return 'Range Not Satisfiable';
    case 417:
      return 'Expectation Failed';
    case 418:
      return "I'm a teapot";
    case 421:
      return 'Misdirected Request';
    case 422:
      return 'Unprocessable Entity';
    case 423:
      return 'Locked';
    case 424:
      return 'Failed Dependency';
    case 425:
      return 'Too Early';
    case 426:
      return 'Upgrade Required';
    case 428:
      return 'Precondition Required';
    case 429:
      return 'Too Many Requests';
    case 431:
      return 'Request Header Fields Too Large';
    case 451:
      return 'Unavailable For Legal Reasons';
    case 500:
      return `Status code 500 - ${messages.serverError}`;
    case 501:
      return 'Not Implemented';
    case 502:
      return 'Bad Gateway';
    case 503:
      return 'Service Unavailable';
    case 504:
      return 'Gateway Timeout';
    case 505:
      return 'HTTP Version Not Supported';
    case 506:
      return 'Variant Also Negotiates';
    case 507:
      return 'Insufficient Storage';
    case 508:
      return 'Loop Detected';
    case 510:
      return 'Not Extended';
    case 511:
      return 'Network Authentication Required';
    case 204:
      return messages.noContent;
    default:
      return messages.serverError;
  }
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = {
    ...err,
    status: res?.statusCode,
  };

  if (res.headersSent) {
    return next(error);
  }

  if (err?.message) {
    // eslint-disable-next-line no-console
    console.log(`error ${err.message}`);
    return res.status(res?.statusCode).send({
      message: err?.message || responseTypeMessage(res.statusCode),
    });
  }

  res.status(res?.statusCode).send({
    message: responseTypeMessage(res.statusCode),
  });
  throw new Error(err?.message);
};
