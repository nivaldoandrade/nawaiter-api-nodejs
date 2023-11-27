import { OrderItemStatus } from '../entity/OrderItem';

interface OrderItemTable {
  id: string;
  name: string;
}

interface OrderItemProduct {
  id: string;
  name: string;
  price: number;
  imagePath: string;
}

export interface OrderItemResult {
  id: string;
  status: OrderItemStatus;
  quantity: number;
  totalPrice: number;
  observation: string | null;
  product: OrderItemProduct;
  table: OrderItemTable;
  createdAt: Date;
  updatedAt: Date;
}
