import { inject, injectable } from 'tsyringe';

import { IOrderItemsRepository } from '@modules/orderItems/repositories/IOrderItemsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly productRepository: IProductsRepository,

    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,

    @inject('OrderItemsRepository')
    private readonly orderItemsRepository: IOrderItemsRepository,
  ) {}

  public async execute(productId: string) {
    const productExists =
      await this.productRepository.getProductDetailsById(productId);

    if (!productExists) {
      throw new AppError('The product is not found', 404);
    }

    const hasProductInOrder = await this.orderItemsRepository.findByProductId(
      productExists.id,
    );

    if (hasProductInOrder) {
      throw new AppError('Cannot delete product with active orders', 400);
    }

    await this.productRepository.delete(productId);
    await this.storageProvider.deleteFile(productExists.imagePath);
  }
}

export default DeleteProductService;
