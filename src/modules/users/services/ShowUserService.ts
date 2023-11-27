import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('The user is not found', 404);
    }

    return user;
  }
}
export default ShowUserService;
