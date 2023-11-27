import { UserRole } from '@modules/users/entity/User';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function verifyRole(AllowRoles: UserRole[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError('JWT token is missing', 401);
    }

    const role = request.user.role as UserRole;

    if (!AllowRoles.includes(role)) {
      throw new AppError('Invalid JWT Token', 401);
    }

    next();
  };
}
