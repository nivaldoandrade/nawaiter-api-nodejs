import { IsNotEmpty, IsUUID } from 'class-validator';

export class CompletedOrderParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
