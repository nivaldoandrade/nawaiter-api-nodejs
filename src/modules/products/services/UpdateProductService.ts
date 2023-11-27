import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import { ProductRequestDTO } from '../dto/ProductRequestDTO';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,

    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,
  ) {}

  public async execute(
    productId: string,
    {
      name,
      category,
      description,
      imagePath,
      price,
      ingredients,
    }: ProductRequestDTO,
  ) {
    const productExists =
      await this.productsRepository.getProductDetailsById(productId);

    if (!productExists) {
      throw new AppError('The product is not found', 404);
    }

    if (productExists.categoryId !== category) {
      const categoryExists =
        await this.categoriesRepository.findByIdUnique(category);

      if (!categoryExists) {
        throw new AppError('The category does not exist', 404);
      }
    }

    let newImagePath = imagePath;

    if (productExists.imagePath !== imagePath) {
      await this.storageProvider.deleteFile(productExists.imagePath);

      newImagePath = await this.storageProvider.saveFile(imagePath);
    }

    const productUpdated = await this.productsRepository.update(productId, {
      name,
      category,
      description,
      imagePath: newImagePath,
      price,
      ingredients,
    });

    return productUpdated;
  }
}

export default UpdateProductService;
