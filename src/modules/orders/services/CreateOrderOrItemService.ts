import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ITablesRepository } from '@modules/tables/repositories/ITablesRepository';
import AppError from '@shared/errors/AppError';

import { io } from '../../../index';
import { OrderCreate } from '../dto/OrderCreate';
import { IOrdersRespository } from '../Repositories/IOrdersRepository';

interface Item {
  productId: string;
  quantity: number;
  observation?: string;
}

@injectable()
class CreateOrderOrItemService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRespository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) { }

  public async execute({ tableId, items }: OrderCreate) {
    const itemsWithTotalPrice = await this.calculateTotalPriceForItems(items);

    const isTableExists = await this.tablesRepository.findById(tableId);

    if (!isTableExists) {
      throw new AppError('The table is not found', 404);
    }

    let orderId = await this.ordersRepository.getOrderIdByTableId(tableId);

    if (!orderId) {
      orderId = await this.ordersRepository.create({
        tableId,
        items: itemsWithTotalPrice,
      });
    } else {
      await this.ordersRepository.update(orderId, itemsWithTotalPrice);
    }

    io.emit('order', true);

    return orderId;
  }

  private async calculateTotalPriceForItems(items: Item[]) {
    const promiseItems = items.map(async (item) => {
      const product = await this.productsRepository.findById(item.productId);

      if (!product) {
        throw new AppError('The product is not found', 404);
      }

      return {
        ...item,
        totalPrice: item.quantity * product.price,
      };
    });

    return Promise.all(promiseItems);
  }
}

export default CreateOrderOrItemService;
