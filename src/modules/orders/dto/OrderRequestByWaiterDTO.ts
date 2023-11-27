import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

import { OrderProductDTO } from './OrderProductDTO';

export class OrderRequestByWaiterDTO {
  @IsNotEmpty()
  @IsUUID()
  tableId: string;

  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  items: OrderProductDTO[];
}
