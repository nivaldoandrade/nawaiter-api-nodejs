import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  public async execute(productId: string) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('The Product is not found', 404);
    }

    return product;
  }
}

export default ShowProductService;
