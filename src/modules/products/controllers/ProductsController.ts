import { container } from 'tsyringe';

import paginationConfig from '@shared/config/pagination';
import { removeFileTemp } from '@shared/utils/removeFileTemp';
import { Request, Response } from 'express';

import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductsService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

class ProductsController {
  public async list(request: Request, response: Response) {
    const { query } = request;

    const page = Number(query.page) || paginationConfig.page;
    const limit = Number(query.limit) || paginationConfig.limit;

    const listProductsService = container.resolve(ListProductsService);

    const { products, totalCount } = await listProductsService.execute({
      page,
      limit,
    });

    return response.json({ products, totalCount });
  }

  public async show(request: Request, response: Response) {
    const productId = request.params.id;

    const showProductService = container.resolve(ShowProductService);

    const product = await showProductService.execute(productId);

    return response.json(product);
  }

  public async create(request: Request, response: Response) {
    const product = request.body;
    const imagePath = request.file?.filename;

    try {
      const createProductService = container.resolve(CreateProductService);

      const newProduct = await createProductService.execute(product);

      return response.status(201).json(newProduct);
    } catch (error) {
      imagePath && removeFileTemp(imagePath);

      throw error;
    }
  }

  public async update(request: Request, response: Response) {
    const product = request.body;
    const productId = request.params.id;
    const imagePath = request.file?.filename;
    try {
      const updatedProductService = container.resolve(UpdateProductService);

      const productUpdated = await updatedProductService.execute(
        productId,
        product,
      );

      return response.json(productUpdated);
    } catch (error) {
      imagePath && removeFileTemp(imagePath);

      throw error;
    }
  }

  public async delete(request: Request, response: Response) {
    const productId = request.params.id;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute(productId);

    return response.sendStatus(204);
  }
}

export default new ProductsController();
