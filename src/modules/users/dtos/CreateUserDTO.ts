import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { EnumUserRole, UserRole } from '../entity/User';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(EnumUserRole)
  role: UserRole;
}
