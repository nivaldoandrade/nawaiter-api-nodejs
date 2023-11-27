import { validationMiddleware } from '@shared/middlewares/validateRequest';
import { Router } from 'express';

import authController from '../controllers/AuthController';
import { AuthRequestDTO } from '../dtos/AuthRequestDTO';

const authRoutes = Router();

authRoutes.post(
  '/',
  validationMiddleware(AuthRequestDTO, 'body'),
  authController.signin,
);

export default authRoutes;
