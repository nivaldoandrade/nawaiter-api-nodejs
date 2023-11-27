import { OrderItemStatus } from '../entity/OrderItem';

export interface OrderItemListToStatus {
  id: string;
  status: OrderItemStatus;
  quantity: number;
  table: string;
  product: {
    id: string;
    name: string;
  };
  observation: string | null;
  createdAt: Date;
  updatedAt: Date;
}
