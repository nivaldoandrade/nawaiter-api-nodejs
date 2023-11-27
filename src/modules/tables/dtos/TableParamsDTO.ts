import { IsNotEmpty, IsUUID } from 'class-validator';

export class TableParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
