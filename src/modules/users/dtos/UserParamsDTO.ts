import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserParamsDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
