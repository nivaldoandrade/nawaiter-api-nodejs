import { inject, injectable } from 'tsyringe';

import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';

import { ITablesRepository } from '../repositories/ITablesRepository';

interface IRequest {
  name: string;
  username: string;
  password: string;
}

@injectable()
class CreateTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('EncryptionProvider')
    private encryptionProvider: IEncryptionProvider,
  ) {}

  public async execute({ name, username, password }: IRequest) {
    const tableExists = await this.tablesRepository.findByUsername(username);

    if (tableExists) {
      throw new AppError('This username is already in use', 409, 'username');
    }

    const passwordHash = await this.encryptionProvider.generateHash(password);

    const table = await this.tablesRepository.create({
      name,
      username,
      password: passwordHash,
    });

    return table;
  }
}

export default CreateTableService;
