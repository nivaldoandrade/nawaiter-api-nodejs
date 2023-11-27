import { OrderItemStatus } from '@modules/orderItems/entity/OrderItem';

interface ResulItem {
  id: string;
  status: OrderItemStatus;
  quantity: number;
  totalPrice: number;
  observation?: string | null;
  product: {
    id: string;
    name: string;
    price: number;
    imagePath: string;
  };
}

export interface OrderShow {
  id: string;
  orderNumber: number;
  table: {
    name: string;
  };
  finishedAt: Date | null;
  items: ResulItem[];
  createdAt: Date;
  updatedAt: Date;
}
