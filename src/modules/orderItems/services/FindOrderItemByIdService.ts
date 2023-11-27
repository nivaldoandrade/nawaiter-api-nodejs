import { container, inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IOrderItemsRepository } from '../repositories/IOrderItemsRepository';

@injectable()
class FindOrderItemByIdService {
  constructor(
    @inject('OrderItemsRepository')
    private orderItemsRepository: IOrderItemsRepository,
  ) {}

  public async findById(id: string) {
    const orderItem = await this.orderItemsRepository.findById(id);

    if (!orderItem) {
      throw new AppError('The OrderItem is not found', 404);
    }

    return orderItem;
  }
}

container.registerSingleton(
  'FindOrderItemByIdService',
  FindOrderItemByIdService,
);

export default FindOrderItemByIdService;
