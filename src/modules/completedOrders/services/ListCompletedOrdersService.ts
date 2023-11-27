import { inject, injectable } from 'tsyringe';

import { ICompletedOrderRepository } from '../repositories/ICompletedOrdersRepository';

interface IListCompletedOrdersService {
  page: number;
  limit: number;
  dateStart?: string;
  dateEnd?: string;
}

@injectable()
class ListCompletedOrdersService {
  constructor(
    @inject('CompletedOrdersRepository')
    private completedOrdersRepository: ICompletedOrderRepository,
  ) {}

  public async execute({
    page,
    limit,
    dateStart,
    dateEnd,
  }: IListCompletedOrdersService) {
    return this.completedOrdersRepository.findAll(
      page,
      limit,
      dateStart,
      dateEnd,
    );
  }
}

export default ListCompletedOrdersService;
