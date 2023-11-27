import { PaginationQueryDTO } from '@shared/dto/PaginationQueryDTO';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Body, Param, Query } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import { Router } from 'express';

import categoriesController from '../controllers/CategoriesController';
import { CategoryParamsDTO } from '../dto/CategoryParamsDTO';
import { CategoryRequestDTO } from '../dto/CategoryRequestDTO';

const categoriesRoutes = Router();

// ROUTER PUBLIC

categoriesRoutes.get('/', Query(PaginationQueryDTO), categoriesController.list);
categoriesRoutes.get(
  '/:id',
  Param(CategoryParamsDTO),
  categoriesController.show,
);

// ROUTER PRIVATE ADMIN

categoriesRoutes.use(ensureAuthenticated, verifyRole(['admin']));

categoriesRoutes.post(
  '/',
  Body(CategoryRequestDTO),
  categoriesController.create,
);
categoriesRoutes.put(
  '/:id',
  Param(CategoryParamsDTO),
  Body(CategoryRequestDTO),
  categoriesController.update,
);
categoriesRoutes.delete(
  '/:id',
  Param(CategoryParamsDTO),
  categoriesController.delete,
);

export default categoriesRoutes;
