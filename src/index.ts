import 'reflect-metadata';
import '@shared/container';
import 'express-async-errors';
import { createServer } from 'node:http';

import 'dotenv/config';

import { Server } from 'socket.io';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ValidationErrors from '@shared/errors/ValidationErrors';
import cors, { allowedOrigins } from '@shared/middlewares/cors';
import routes from '@shared/routes';
import CreateUserAdmin from '@shared/utils/createUserAdmin';
import express, { NextFunction, Request, Response } from 'express';

const createUserAdmin = container.resolve(CreateUserAdmin);

const port = process.env.PORT || 3333;

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
  },
});

app.use(cors);
app.use(express.json());
app.use('/upload', express.static('uploads'));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    console.log(err);
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        fieldName: err.fieldName,
      });
    }

    if (err instanceof ValidationErrors) {
      return response.status(400).json(err);
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

httpServer.listen(port, async () => {
  await createUserAdmin.execute();
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
