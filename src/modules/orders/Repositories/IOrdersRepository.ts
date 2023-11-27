import { OrderCreate, OrderCreateItem } from '../dto/OrderCreate';
import { OrderList } from '../dto/OrderList';
import { OrderShow } from '../dto/OrderShow';

export interface IOrdersRespository {
  findAll(
    page: number,
    limit: number,
  ): Promise<{
    orders: OrderList[];
    totalCount: number;
  }>;
  create(order: OrderCreate): Promise<string>;
  update(id: string, items: OrderCreateItem[]): Promise<void>;
  getOrderIdByTableId(id: string): Promise<string | null>;
  findByIdIncludingProductAndTable(orderId: string): Promise<OrderShow | null>;
  findByTableId(tableId: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}
