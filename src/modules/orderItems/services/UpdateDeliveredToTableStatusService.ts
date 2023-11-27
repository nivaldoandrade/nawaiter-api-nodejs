import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { io } from '../../../index';
import { IOrderItemsRepository } from '../repositories/IOrderItemsRepository';

import FindOrderItemByIdService from './FindOrderItemByIdService';

@injectable()
class UpdateDeliveredToTableStatusService {
  constructor(
    @inject('OrderItemsRepository')
    private orderItemsRepository: IOrderItemsRepository,

    @inject('FindOrderItemByIdService')
    private findOrderItemByIdService: FindOrderItemByIdService,
  ) {}

  public async execute(id: string) {
    const orderItem = await this.findOrderItemByIdService.findById(id);

    if (
      orderItem.status === 'WAITING' ||
      orderItem.status === 'IN_PRODUCTION'
    ) {
      throw new AppError(
        'The order is already in WAITING or IN_PRODUCTION and it is not possible to change the DELIVERED_TO_TABLE status',
        400,
      );
    }

    if (orderItem.status === 'DELIVERED_TO_TABLE') {
      throw new AppError('The order is already DELIVERED_TO_TABLE', 400);
    }

    await this.orderItemsRepository.update(id, 'DELIVERED_TO_TABLE');

    io.emit('order', true);
  }
}

export default UpdateDeliveredToTableStatusService;
