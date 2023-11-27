export interface OrderCreateItem {
  productId: string;
  totalPrice: number;
  observation?: string;
  quantity: number;
}

export interface OrderCreate {
  tableId: string;
  items: OrderCreateItem[];
}
