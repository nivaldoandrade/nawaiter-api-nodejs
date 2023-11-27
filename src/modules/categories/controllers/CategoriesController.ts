import { container } from 'tsyringe';

import paginationConfig from '@shared/config/pagination';
import { Request, Response } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import LisCategoriesService from '../services/ListCategoriesService';
import ShowCategoryService from '../services/ShowCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';

export class CategoriesController {
  public async list(request: Request, response: Response) {
    const { query } = request;

    const page = Number(query.page) || paginationConfig.page;
    const limit = Number(query.limit) || paginationConfig.limit;

    const listCategoriesService = container.resolve(LisCategoriesService);

    const { categories, totalCount } = await listCategoriesService.execute({
      page,
      limit,
    });

    return response.json({ categories, totalCount });
  }

  public async create(request: Request, response: Response) {
    const category = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const newCategory = await createCategoryService.execute(category);

    return response.status(201).json(newCategory);
  }

  public async show(request: Request, response: Response) {
    const categoryId = request.params.id;

    const showCategoryService = container.resolve(ShowCategoryService);

    const category = await showCategoryService.execute(categoryId);

    return response.json(category);
  }

  public async update(request: Request, response: Response) {
    const categoryId = request.params.id;
    const category = request.body;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    const newCategory = await updateCategoryService.execute(
      categoryId,
      category,
    );

    return response.json(newCategory);
  }

  public async delete(request: Request, response: Response) {
    const categoryId = request.params.id;

    const deleteCategoryService = container.resolve(DeleteCategoryService);

    await deleteCategoryService.execute(categoryId);

    return response.sendStatus(204);
  }
}

export default new CategoriesController();
