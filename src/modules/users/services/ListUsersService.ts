import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IListUsersService {
  page: number;
  limit: number;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute({ page, limit }: IListUsersService) {
    return this.usersRepository.findAll(page, limit);
  }
}

export default ListUsersService;
