import { container } from 'tsyringe';

import paginationConfig from '@shared/config/pagination';
import { Request, Response } from 'express';

import CreateOrderOrItemService from '../services/CreateOrderOrItemService';
import ListOrdersService from '../services/ListOrdersService';
import ShowOrderService from '../services/ShowOrderService';

class OrdersController {
  public async list(request: Request, response: Response) {
    const { query } = request;

    const page = Number(query.page) || paginationConfig.page;
    const limit = Number(query.limit) || paginationConfig.limit;

    const listOrdersService = container.resolve(ListOrdersService);

    const orders = await listOrdersService.execute({ page, limit });

    return response.json(orders);
  }

  public async createByTable(request: Request, response: Response) {
    const { items } = request.body;
    const tableId = request.table.id;

    const createOrderService = container.resolve(CreateOrderOrItemService);

    const order = await createOrderService.execute({ tableId, items });

    return response.json(order);
  }

  public async createByWaiter(request: Request, response: Response) {
    const { tableId, items } = request.body;

    const createOrderService = container.resolve(CreateOrderOrItemService);

    const order = await createOrderService.execute({ tableId, items });

    return response.json(order);
  }

  public async show(request: Request, response: Response) {
    const orderId = request.params.id;

    const showOrderService = container.resolve(ShowOrderService);

    const order = await showOrderService.execute(orderId);

    return response.json(order);
  }
}

export default new OrdersController();
