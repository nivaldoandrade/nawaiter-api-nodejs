import { Exclude } from 'class-transformer';

import { UserRole } from '../entity/User';

export class UserResponseDTO {
  id: string;

  name: string;

  username: string;

  role: UserRole;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  password: string;
}
