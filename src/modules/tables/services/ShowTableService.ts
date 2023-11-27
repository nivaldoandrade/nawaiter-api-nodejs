import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ITablesRepository } from '../repositories/ITablesRepository';

@injectable()
class ShowTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) {}

  public async execute(id: string) {
    const table = await this.tablesRepository.findById(id);

    if (!table) {
      throw new AppError('Table is not found', 404);
    }

    return table;
  }
}

export default ShowTableService;
