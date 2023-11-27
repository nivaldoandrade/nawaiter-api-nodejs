import { PaginationQueryDTO } from '@shared/dto/PaginationQueryDTO';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Body, Param, Query } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import { Router } from 'express';

import usersController from '../controllers/UsersController';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserParamsDTO } from '../dtos/UserParamsDTO';
import { UserUpdateDTO } from '../dtos/UserUpdateDTO';

const usersRoutes = Router();

usersRoutes.use(ensureAuthenticated, verifyRole(['admin']));

usersRoutes.get('/', Query(PaginationQueryDTO), usersController.list);
usersRoutes.get('/:id', Param(UserParamsDTO), usersController.show);
usersRoutes.post('/', Body(CreateUserDTO), usersController.create);
usersRoutes.put(
  '/:id',
  Param(UserParamsDTO),
  Body(UserUpdateDTO),
  usersController.update,
);
usersRoutes.delete('/:id', Param(UserParamsDTO), usersController.delete);

export default usersRoutes;
