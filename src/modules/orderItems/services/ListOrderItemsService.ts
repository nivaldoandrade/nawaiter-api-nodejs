import { inject, injectable } from 'tsyringe';

import { OrderItemListToStatus } from '../dto/OrderItemListToStatus';
import { EnumOrderItemStatus } from '../entity/OrderItem';
import { IOrderItemsRepository } from '../repositories/IOrderItemsRepository';

interface OrderitemsFormatted {
  WAITING: Array<OrderItemListToStatus>;
  IN_PRODUCTION: Array<OrderItemListToStatus>;
  DONE: Array<OrderItemListToStatus>;
  DELIVERED_TO_TABLE: Array<OrderItemListToStatus>;
  CANCELLED: Array<OrderItemListToStatus>;
}

@injectable()
class ListOrderItemsService {
  constructor(
    @inject('OrderItemsRepository')
    private orderItemsRepository: IOrderItemsRepository,
  ) {}

  public async execute() {
    const orderitems = await this.orderItemsRepository.findAll();

    const orderitemsFormatted = orderitems.reduce(
      (acc, item) => {
        const { status } = item;

        if (EnumOrderItemStatus[status]) {
          acc[status].push(item);
        }
        return acc;
      },
      {
        WAITING: [],
        IN_PRODUCTION: [],
        DONE: [],
        DELIVERED_TO_TABLE: [],
        CANCELLED: [],
      } as OrderitemsFormatted,
    );

    return orderitemsFormatted;
  }
}

export default ListOrderItemsService;
