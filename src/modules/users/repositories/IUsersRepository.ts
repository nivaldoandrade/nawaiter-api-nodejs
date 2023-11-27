import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserList } from '../dtos/UserList';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { UserUpdateDTO } from '../dtos/UserUpdateDTO';
import { UserRole } from '../entity/User';

export interface IUsersRepository {
  create(user: CreateUserDTO): Promise<UserResponseDTO>;
  findAll(
    page: number,
    limit: number,
  ): Promise<{
    users: UserList[];
    totalCount: number;
  }>;
  findByUsernameUnique(username: string): Promise<string | null>;
  findByUsername(username: string): Promise<UserResponseDTO | null>;
  findById(id: string): Promise<UserResponseDTO | null>;
  findByRole(role: UserRole): Promise<UserResponseDTO | null>;
  update(id: string, user: UserUpdateDTO): Promise<UserResponseDTO | null>;
  delete(id: string): Promise<void>;
}
