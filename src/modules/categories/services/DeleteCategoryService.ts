import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string) {
    const categoryExists = await this.categoriesRepository.findByIdUnique(id);

    if (!categoryExists) {
      throw new AppError('The caregory is not found', 404);
    }

    const hasProductInCategory =
      await this.productsRepository.findByCategoryId(categoryExists);

    if (hasProductInCategory) {
      throw new AppError(
        'Cannot delete the category as it is being used by one or more products',
        400,
      );
    }

    await this.categoriesRepository.delete(id);
  }
}

export default DeleteCategoryService;
