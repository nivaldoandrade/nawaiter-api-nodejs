import { NextFunction, Request, Response } from 'express';

export const allowedOrigins = [
  'http://localhost:4173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
];

export default (request: Request, response: Response, next: NextFunction) => {
  const origin = request.header('origin');

  if (origin) {
    const isAllowed = allowedOrigins.includes(origin);

    if (isAllowed) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Access-Control-Allow-Headers', '*');
      response.setHeader('Access-Control-Allow-Methods', '*');
      response.setHeader('Access-Control-Max-Age', '10');

      if (request.method === 'OPTIONS') {
        return response.sendStatus(200);
      }
    }
  }

  next();
};
