import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthRequestDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
