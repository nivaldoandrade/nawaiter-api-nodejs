import { IsNotEmpty, IsUUID } from 'class-validator';

export class OrderItemParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
