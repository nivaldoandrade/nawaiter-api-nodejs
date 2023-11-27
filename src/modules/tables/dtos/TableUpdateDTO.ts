import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TableUpdateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password?: string;
}
