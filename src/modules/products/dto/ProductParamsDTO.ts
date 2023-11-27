import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProductParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
