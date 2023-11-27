import { inject, injectable } from 'tsyringe';

import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute(user: CreateUserDTO) {
    const { name, username, role, password } = user;

    const usernameTaken =
      await this.usersRepository.findByUsernameUnique(username);

    if (usernameTaken) {
      throw new AppError('This username is already in use', 409, 'username');
    }

    const hashPassword = await this.encryptionProvider.generateHash(password);

    const newUser = await this.usersRepository.create({
      name,
      username,
      password: hashPassword,
      role,
    });

    return newUser;
  }
}

export default CreateUserService;
