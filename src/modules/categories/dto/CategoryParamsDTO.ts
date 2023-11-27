import { IsNotEmpty, IsUUID } from 'class-validator';

export class CategoryParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
