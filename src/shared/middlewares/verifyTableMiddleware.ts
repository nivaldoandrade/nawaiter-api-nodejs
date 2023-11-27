import { NextFunction, Request, Response } from 'express';

export default function verifyTableMiddleware() {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!request.table) {
      return response.status(401).end();
    }

    next();
  };
}
