import { Expose } from 'class-transformer';

export class CompleteOrderItem {
  @Expose()
  itemId: string;

  @Expose()
  productId: string;

  @Expose()
  name: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  observation?: string | null;
}

export interface CompletedOrderCreate {
  orderNumber: number;
  table: string;
  items: CompleteOrderItem[];
  totalPrice: number;
}
