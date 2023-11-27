import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}
