export enum EnumOrderItemStatus {
  WAITING = 'WAITING',
  IN_PRODUCTION = 'IN_PRODUCTION',
  DONE = 'DONE',
  DELIVERED_TO_TABLE = 'DELIVERED_TO_TABLE',
  CANCELLED = 'CANCELLED',
}

export type OrderItemStatus = keyof typeof EnumOrderItemStatus;
