import { inject, injectable } from 'tsyringe';

import { IOrdersRespository } from '@modules/orders/Repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';

import { ITablesRepository } from '../repositories/ITablesRepository';

@injectable()
class DeleteTableService {
  constructor(
    @inject('TablesRepository')
    private tablesRepository: ITablesRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRespository,
  ) {}

  public async execute(id: string) {
    const tableExists = await this.tablesRepository.findById(id);

    if (!tableExists) {
      throw new AppError('The table is not found', 404);
    }

    const isTableBeingUsed = await this.ordersRepository.findByTableId(
      tableExists.id,
    );

    if (isTableBeingUsed) {
      throw new AppError('The table is currently being used', 409);
    }

    await this.tablesRepository.delete(id);
  }
}

export default DeleteTableService;
