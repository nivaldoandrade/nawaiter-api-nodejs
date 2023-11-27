import { inject, injectable } from 'tsyringe';

import { IOrdersRespository } from '../Repositories/IOrdersRepository';

interface IListOrderService {
  page: number;
  limit: number;
}

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRespository,
  ) {}

  public async execute({ page, limit }: IListOrderService) {
    return this.ordersRepository.findAll(page, limit);
  }
}

export default ListOrdersService;
