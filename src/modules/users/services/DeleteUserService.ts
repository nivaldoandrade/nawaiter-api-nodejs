import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('The user is not found', 404);
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
