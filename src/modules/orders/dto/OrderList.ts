export interface OrderList {
  itemsCount: number;
  tableId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  table: {
    name: string;
  };
}
