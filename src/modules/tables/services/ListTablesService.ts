import { inject, injectable } from 'tsyringe';

import { ITablesRepository } from '../repositories/ITablesRepository';

interface IListTablesService {
  page: number;
  limit: number;
}

@injectable()
class ListTablesService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,
  ) {}

  public async execute({ page, limit }: IListTablesService) {
    return this.tablesRepository.findAll(page, limit);
  }
}

export default ListTablesService;
