import { PaginationQueryDTO } from '@shared/dto/PaginationQueryDTO';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Param, Query } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import { Router } from 'express';

import completedOrdersController from '../controllers/CompletedOrdersController';
import { CompletedOrderParamsDTO } from '../dto/CompletedOrderParamsDTO';

const completedOrdersRoutes = Router();

completedOrdersRoutes.use(ensureAuthenticated, verifyRole(['admin']));

completedOrdersRoutes.get(
  '/',
  Query(PaginationQueryDTO),
  completedOrdersController.list,
);
completedOrdersRoutes.get(
  '/:id',
  Param(CompletedOrderParamsDTO),
  completedOrdersController.show,
);
completedOrdersRoutes.post(
  '/:id',
  Param(CompletedOrderParamsDTO),
  completedOrdersController.create,
);

export default completedOrdersRoutes;
