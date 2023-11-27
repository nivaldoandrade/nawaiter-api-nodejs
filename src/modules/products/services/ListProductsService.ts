import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../repositories/IProductsRepository';

interface IListProductsService {
  page: number;
  limit: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  public async execute({ page, limit }: IListProductsService) {
    return this.productsRepository.findAll(page, limit);
  }
}

export default ListProductsService;
