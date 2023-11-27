import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IOrdersRespository } from '../Repositories/IOrdersRepository';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRespository,
  ) {}

  public async execute(id: string) {
    const order =
      await this.ordersRepository.findByIdIncludingProductAndTable(id);

    if (!order) {
      throw new AppError('The Order is not found', 404);
    }

    return order;
  }
}

export default ShowOrderService;
