import { container } from 'tsyringe';

import paginationConfig from '@shared/config/pagination';
import { Request, Response } from 'express';

import CreateCompletedOrderService from '../services/CreateCompletedOrderService';
import ListCompletedOrdersService from '../services/ListCompletedOrdersService';
import ShowCompletedOrderService from '../services/ShowCompletedOrderService';

class CompletedOrdersController {
  public async list(request: Request, response: Response) {
    const { query } = request;

    const page = Number(query.page) || paginationConfig.page;
    const limit = Number(query.limit) || paginationConfig.limit;
    const dateStart = query.dateStart as string;
    const dateEnd = query.dateEnd as string;

    const listCompletedOrdersService = container.resolve(
      ListCompletedOrdersService,
    );

    const { completedOrders, totalCount } =
      await listCompletedOrdersService.execute({
        page,
        limit,
        dateStart,
        dateEnd,
      });

    return response.json({ completedOrders, totalCount });
  }

  public async create(request: Request, response: Response) {
    const { id } = request.params;

    const createCompletedOrderService = container.resolve(
      CreateCompletedOrderService,
    );

    const order = await createCompletedOrderService.execute(id);

    return response.json(order);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showCompletedOrderService = container.resolve(
      ShowCompletedOrderService,
    );

    const completedOrder = await showCompletedOrderService.execute(id);

    return response.json(completedOrder);
  }
}

export default new CompletedOrdersController();
