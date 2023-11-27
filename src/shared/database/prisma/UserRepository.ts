import { PrismaClient } from '@prisma/client';

import { UserList } from '@modules/users/dtos/UserList';
import { UserResponseDTO } from '@modules/users/dtos/UserResponseDTO';
import { UserUpdateDTO } from '@modules/users/dtos/UserUpdateDTO';
import { UserRole } from '@modules/users/entity/User';

import { CreateUserDTO } from '../../../modules/users/dtos/CreateUserDTO';
import { IUsersRepository } from '../../../modules/users/repositories/IUsersRepository';

class UserRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    users: UserList[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          role: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return {
      users,
      totalCount: count,
    };
  }

  async create(user: CreateUserDTO): Promise<UserResponseDTO> {
    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
  }

  async findByUsernameUnique(username: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    return user?.id ?? null;
  }

  async findByUsername(username: string): Promise<UserResponseDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user;
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByRole(role: UserRole): Promise<UserResponseDTO | null> {
    return this.prisma.user.findFirst({
      where: { role },
    });
  }

  async update(
    id: string,
    { name, username, password, role }: UserUpdateDTO,
  ): Promise<UserResponseDTO | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { name, username, password, role },
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

export default UserRepository;
