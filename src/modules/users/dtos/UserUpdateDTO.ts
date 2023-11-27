import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { EnumUserRole, UserRole } from '../entity/User';

export class UserUpdateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsEnum(EnumUserRole)
  role: UserRole;
}
