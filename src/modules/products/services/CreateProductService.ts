import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { removeFileTemp } from '@shared/utils/removeFileTemp';

import { ProductRequestDTO } from '../dto/ProductRequestDTO';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,

    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(product: ProductRequestDTO) {
    const hasCategory = await this.categoriesRepository.findByIdUnique(
      product.category,
    );

    if (!hasCategory) {
      await removeFileTemp(product.imagePath);

      throw new AppError('Category not found', 400);
    }

    const filename = await this.storageProvider.saveFile(product.imagePath);

    product.imagePath = filename;

    return this.productsRepository.create(product);
  }
}

export default CreateProductService;
