import { CompleteOrderItem } from './CompletedOrderCreate';

export interface CompletedOrderShow {
  id: string;
  table: string;
  date: Date;
  totalPrice: number;
  items: CompleteOrderItem[];
}
