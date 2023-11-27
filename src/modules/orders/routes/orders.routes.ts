import { PaginationQueryDTO } from '@shared/dto/PaginationQueryDTO';
import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Body, Param, Query } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import verifyTableMiddleware from '@shared/middlewares/verifyTableMiddleware';
import { Router } from 'express';

import ordersController from '../controllers/OrdersController';
import { OrderParamsDTO } from '../dto/OrderParamsDTO';
import { OrderRequestByTableDTO } from '../dto/OrderRequestByTableDTO';
import { OrderRequestByWaiterDTO } from '../dto/OrderRequestByWaiterDTO';

const ordersRoutes = Router();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get('/', Query(PaginationQueryDTO), ordersController.list);
ordersRoutes.get('/:id', Param(OrderParamsDTO), ordersController.show);

ordersRoutes.post(
  '/table',
  verifyTableMiddleware(),
  Body(OrderRequestByTableDTO),
  ordersController.createByTable,
);
ordersRoutes.post(
  '/waiter',
  verifyRole(['admin', 'garcom']),
  Body(OrderRequestByWaiterDTO),
  ordersController.createByWaiter,
);

export default ordersRoutes;
