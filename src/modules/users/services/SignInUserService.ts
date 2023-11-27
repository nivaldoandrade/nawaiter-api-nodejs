import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import jwtConfig from '@shared/config/auth';
import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

@injectable()
class SignInUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,

    @inject('EncryptionProvider')
    private readonly encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute({ username, password }: IRequest) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Incorrect username/password combination', 401);
    }

    const isPasswordValid = await this.encryptionProvider.compareHash(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new AppError('Incorrect username/password combination', 401);
    }

    const { secret, expiresIn } = jwtConfig.jwt;

    const accessToken = sign(
      { sub: user.id, role: user.role, entity: 'user' },
      secret,
      {
        expiresIn,
      },
    );

    return { accessToken };
  }
}

export default SignInUserService;
