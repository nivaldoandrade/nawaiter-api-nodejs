import { ensureAuthenticated } from '@shared/middlewares/ensureAuthenticated';
import { Param } from '@shared/middlewares/validateRequest';
import verifyRole from '@shared/middlewares/verifyRole';
import { Router } from 'express';

import orderItemController from '../controllers/OrderItemsController';
import { OrderItemParamsDTO } from '../dto/OrdemItemParamsDTO';

const orderItemsRoutes = Router();

orderItemsRoutes.use(ensureAuthenticated);

// ADMIN, COZINHA, GARCOM
orderItemsRoutes.use(verifyRole(['admin', 'cozinha', 'garcom']));

orderItemsRoutes.patch(
  '/:id/cancel',
  Param(OrderItemParamsDTO),
  orderItemController.updateCancelStatus,
);

// ADMIN, COZINHA
orderItemsRoutes.use(verifyRole(['admin', 'cozinha']));

orderItemsRoutes.get('/', orderItemController.list);
orderItemsRoutes.get(
  '/:id',
  Param(OrderItemParamsDTO),
  orderItemController.show,
);
orderItemsRoutes.patch(
  '/:id/in-production',
  Param(OrderItemParamsDTO),
  orderItemController.updateToInProductionStatus,
);
orderItemsRoutes.patch(
  '/:id/done',
  Param(OrderItemParamsDTO),
  orderItemController.updateDoneStatus,
);
orderItemsRoutes.patch(
  '/:id/delivered-to-table',
  Param(OrderItemParamsDTO),
  orderItemController.updateDeliveredToTableStatus,
);

export default orderItemsRoutes;
