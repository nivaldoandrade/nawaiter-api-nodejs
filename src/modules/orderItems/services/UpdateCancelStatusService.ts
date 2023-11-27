import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { io } from '../../../index';
import { IOrderItemsRepository } from '../repositories/IOrderItemsRepository';

import FindOrderItemByIdService from './FindOrderItemByIdService';

@injectable()
class UpdateCancelStatusService {
  constructor(
    @inject('OrderItemsRepository')
    private orderItemsRepository: IOrderItemsRepository,

    @inject('FindOrderItemByIdService')
    private findOrderItemByIdService: FindOrderItemByIdService,
  ) {}

  public async execute(id: string) {
    const orderItem = await this.findOrderItemByIdService.findById(id);

    if (orderItem.status === 'DELIVERED_TO_TABLE') {
      throw new AppError('The order was DELIVERED_TO_TABLE', 400);
    }

    if (orderItem.status === 'CANCELLED') {
      throw new AppError('The order has already been CANCELLED', 400);
    }

    await this.orderItemsRepository.update(id, 'CANCELLED');

    io.emit('order', true);
  }
}

export default UpdateCancelStatusService;
