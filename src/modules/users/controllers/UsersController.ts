import { plainToClass } from 'class-transformer';
import { container } from 'tsyringe';

import paginationConfig from '@shared/config/pagination';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUsersService from '../services/ListUsersService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

class UsersController {
  public async list(request: Request, response: Response) {
    const { query } = request;

    const page = Number(query.page) || paginationConfig.page;
    const limit = Number(query.limit) || paginationConfig.limit;

    const listUsersService = container.resolve(ListUsersService);

    const { users, totalCount } = await listUsersService.execute({
      page,
      limit,
    });

    return response.json({ users, totalCount });
  }

  public async create(request: Request, response: Response) {
    const user: CreateUserDTO = request.body;
    const createUserService = container.resolve(CreateUserService);

    const newUser = await createUserService.execute(user);

    return response.json(plainToClass(UserResponseDTO, newUser));
  }

  public async me(request: Request, response: Response) {
    const userId = request.user.id;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(userId);

    return response.json(plainToClass(UserResponseDTO, user));
  }

  public async show(request: Request, response: Response) {
    const userId = request.params.id;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(userId);

    return response.json(plainToClass(UserResponseDTO, user));
  }

  public async update(request: Request, response: Response) {
    const userId = request.params.id;
    const { name, username, password, role } = request.body;

    const updatedUserService = container.resolve(UpdateUserService);

    const user = await updatedUserService.execute(userId, {
      name,
      username,
      password,
      role,
    });

    return response.json(plainToClass(UserResponseDTO, user));
  }

  public async delete(request: Request, response: Response) {
    const userId = request.params.id;
    const currentLoggedInUserId = request.user.id;

    if (userId === currentLoggedInUserId) {
      throw new AppError("You can't delete your own account.", 409);
    }

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(userId);

    return response.sendStatus(204);
  }
}

export default new UsersController();
