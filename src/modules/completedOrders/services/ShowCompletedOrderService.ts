import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ICompletedOrderRepository } from '../repositories/ICompletedOrdersRepository';

@injectable()
class ShowCompletedOrderService {
  constructor(
    @inject('CompletedOrdersRepository')
    private completedOrdersRepository: ICompletedOrderRepository,
  ) {}

  public async execute(id: string) {
    const completedOrder = await this.completedOrdersRepository.findById(id);

    if (!completedOrder) {
      throw new AppError('The completed order was not found', 404);
    }

    return completedOrder;
  }
}

export default ShowCompletedOrderService;
