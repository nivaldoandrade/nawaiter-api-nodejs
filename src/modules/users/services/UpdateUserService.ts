import { inject, injectable } from 'tsyringe';

import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';

import { UserUpdateDTO } from '../dtos/UserUpdateDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute(
    id: string,
    { name, username, password, role }: UserUpdateDTO,
  ) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('The user is not found', 404);
    }

    const usernameExists = await this.usersRepository.findByUsername(username);

    if (usernameExists && usernameExists.id !== user.id) {
      throw new AppError('This username is already in use', 409, 'username');
    }

    let isSamePassword = false;
    let hashPassword;

    if (password) {
      isSamePassword = await this.encryptionProvider.compareHash(
        password,
        user.password,
      );
    }

    if (!isSamePassword && password) {
      hashPassword = await this.encryptionProvider.generateHash(password);
    }

    const updatedUser = await this.usersRepository.update(id, {
      name,
      username,
      role,
      password: hashPassword,
    });

    return updatedUser;
  }
}

export default UpdateUserService;
