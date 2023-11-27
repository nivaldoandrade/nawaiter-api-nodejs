import { IsNotEmpty, IsUUID } from 'class-validator';

export class OrderParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
