import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import jwtConfig from '@shared/config/auth';
import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';

import { TableAuthDTO } from '../dtos/TableAuthDTO';
import { ITablesRepository } from '../repositories/ITablesRepository';

@injectable()
class SignInTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute({ username, password }: TableAuthDTO) {
    const table = await this.tablesRepository.findByUsername(username);

    if (!table) {
      throw new AppError('Incorrect username/password combination', 401);
    }

    const isPasswordValid = await this.encryptionProvider.compareHash(
      password,
      table.password,
    );

    if (!isPasswordValid) {
      throw new AppError('Incorrect username/password combination', 401);
    }

    const { secret, expiresIn } = jwtConfig.jwt;

    const accessToken = sign({ sub: table.id, entity: 'table' }, secret, {
      expiresIn,
    });

    return { accessToken };
  }
}

export default SignInTableService;
