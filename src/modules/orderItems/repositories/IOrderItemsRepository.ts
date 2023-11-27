import { OrderItemListToStatus } from '../dto/OrderItemListToStatus';
import { OrderItemResult } from '../dto/OrderItemResult';
import { OrderItemStatus } from '../entity/OrderItem';

export interface IOrderItemsRepository {
  update(id: string, status: OrderItemStatus): Promise<void>;
  findById(id: string): Promise<OrderItemResult | null>;
  findAll(): Promise<OrderItemListToStatus[]>;
  findByProductId(productId: string): Promise<boolean>;
}
