import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { OrderProductDTO } from './OrderProductDTO';

export class OrderRequestByTableDTO {
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  items: OrderProductDTO[];
}
