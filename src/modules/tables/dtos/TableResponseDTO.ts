import { Exclude } from 'class-transformer';

export class TableResponseDTO {
  id: string;

  name: string;

  username: string;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  password: string;
}
