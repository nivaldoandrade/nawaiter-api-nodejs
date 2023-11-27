import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('The category is not found', 404);
    }

    return category;
  }
}

export default ShowCategoryService;
