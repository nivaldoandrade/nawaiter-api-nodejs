import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { CategoryRequestDTO } from '../dto/CategoryRequestDTO';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(id: string, { name, icon }: CategoryRequestDTO) {
    const categoryExists = await this.categoriesRepository.findByIdUnique(id);

    if (!categoryExists) {
      throw new AppError('The category is not found', 404);
    }

    const category = await this.categoriesRepository.update(id, { name, icon });

    return category;
  }
}

export default UpdateCategoryService;
