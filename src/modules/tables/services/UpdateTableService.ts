import { inject, injectable } from 'tsyringe';

import { IEncryptionProvider } from '@shared/container/providers/encryptionProvider/models/IEncryptionProvider';
import AppError from '@shared/errors/AppError';

import { TableUpdateDTO } from '../dtos/TableUpdateDTO';
import { ITablesRepository } from '../repositories/ITablesRepository';

@injectable()
class UpdateTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('EncryptionProvider')
    private encryptionProvide: IEncryptionProvider,
  ) {}

  public async execute(
    id: string,
    { name, username, password }: TableUpdateDTO,
  ) {
    const table = await this.tablesRepository.findById(id);

    if (!table) {
      throw new AppError('The table is not found', 404);
    }

    const usernameExists = await this.tablesRepository.findByUsername(username);

    if (usernameExists && usernameExists.id !== table.id) {
      throw new AppError('This username is already in use', 409, 'username');
    }

    let isSamePassword = false;
    let hashPassword;

    if (password) {
      isSamePassword = await this.encryptionProvide.compareHash(
        password,
        table.password,
      );
    }

    if (!isSamePassword && password) {
      hashPassword = await this.encryptionProvide.generateHash(password);
    }

    const updatedTable = await this.tablesRepository.update(id, {
      name,
      username,
      password: hashPassword,
    });

    return updatedTable;
  }
}

export default UpdateTableService;
