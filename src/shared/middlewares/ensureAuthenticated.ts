import { verify } from 'jsonwebtoken';

import { UserRole } from '@modules/users/entity/User';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

import authConfig from '../config/auth';

interface ITokenPayload {
  sub: string;
  role: UserRole;
  entity: 'table' | 'user';
  iat: number;
  exp: number;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub, role, entity } = decoded as ITokenPayload;

    if (entity === 'table') {
      request.table = {
        id: sub,
      };
    }

    if (entity === 'user') {
      request.user = {
        id: sub,
        role,
      };
    }
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
