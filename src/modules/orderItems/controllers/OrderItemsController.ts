import { container } from 'tsyringe';

import { Request, Response } from 'express';

import ListOrderItemsService from '../services/ListOrderItemsService';
import ShowOrderItemService from '../services/ShowOrderItemService';
import UpdateCancelStatusService from '../services/UpdateCancelStatusService';
import UpdateDeliveredToTableStatusService from '../services/UpdateDeliveredToTableStatusService';
import UpdateDoneStatusService from '../services/UpdateDoneStatusService';
import UpdateInProductionStatusService from '../services/UpdateInProductionStatusService';

class OrderItemsController {
  public async list(request: Request, response: Response) {
    const listOrderItemsService = container.resolve(ListOrderItemsService);

    const orderItems = await listOrderItemsService.execute();

    return response.json(orderItems);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showOrderItem = container.resolve(ShowOrderItemService);

    const orderItem = await showOrderItem.execute(id);

    return response.json(orderItem);
  }

  public async updateToInProductionStatus(
    request: Request,
    response: Response,
  ) {
    const { id } = request.params;

    const updateInProductionStatusService = container.resolve(
      UpdateInProductionStatusService,
    );

    await updateInProductionStatusService.execute(id);

    return response.sendStatus(204);
  }

  public async updateDoneStatus(request: Request, response: Response) {
    const { id } = request.params;

    const updateDoneStatusService = container.resolve(UpdateDoneStatusService);

    await updateDoneStatusService.execute(id);

    return response.sendStatus(204);
  }

  public async updateDeliveredToTableStatus(
    request: Request,
    response: Response,
  ) {
    const { id } = request.params;

    const updateDeliveredToTableStatusService = container.resolve(
      UpdateDeliveredToTableStatusService,
    );

    await updateDeliveredToTableStatusService.execute(id);

    return response.sendStatus(204);
  }

  public async updateCancelStatus(request: Request, response: Response) {
    const { id } = request.params;

    const updateCancelStatusService = container.resolve(
      UpdateCancelStatusService,
    );

    await updateCancelStatusService.execute(id);

    return response.sendStatus(204);
  }
}

export default new OrderItemsController();
