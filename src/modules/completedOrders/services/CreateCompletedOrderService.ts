import { inject, injectable } from 'tsyringe';

import { IOrdersRespository } from '@modules/orders/Repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';

import {
  CompleteOrderItem,
  CompletedOrderCreate,
} from '../dto/CompletedOrderCreate';
import { ICompletedOrderRepository } from '../repositories/ICompletedOrdersRepository';

@injectable()
class CreateCompletedOrderService {
  constructor(
    @inject('CompletedOrdersRepository')
    private completedOrdersRepository: ICompletedOrderRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRespository,
  ) {}

  public async execute(id: string) {
    const order =
      await this.ordersRepository.findByIdIncludingProductAndTable(id);

    if (!order) {
      throw new AppError('The order is not found', 404);
    }

    const hasItem = order.items.some(
      (item) =>
        item.status !== 'DELIVERED_TO_TABLE' && item.status !== 'CANCELLED',
    );

    if (hasItem) {
      throw new AppError(
        'The order contains items that have not been delivered',
      );
    }

    const itemsFormatted = order.items.reduce((accumulator, currentItem) => {
      if (currentItem.status === 'CANCELLED') {
        return accumulator;
      }

      const { id: itemId, product, quantity, observation } = currentItem;

      const existingItem = accumulator.find(
        (item) =>
          item.productId === product.id && observation === item.observation,
      );

      if (existingItem) {
        existingItem.quantity += quantity;

        return accumulator;
      }

      accumulator.push({
        itemId,
        productId: product.id,
        name: product.name,
        quantity,
        price: product.price,
        observation,
      });

      return accumulator;
    }, [] as CompleteOrderItem[]);

    const totalPriceOrder = order.items.reduce(
      (acc, item) => acc + item.totalPrice,
      0,
    );

    const completedOrder = {
      orderNumber: order.orderNumber,
      table: order.table.name,
      items: itemsFormatted,
      totalPrice: totalPriceOrder,
    } as CompletedOrderCreate;

    await Promise.all([
      this.completedOrdersRepository.create(completedOrder),
      this.ordersRepository.delete(order.id),
    ]);
  }
}

export default CreateCompletedOrderService;
