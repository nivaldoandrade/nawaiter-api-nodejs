import { inject, injectable } from 'tsyringe';

import { CategoryRequestDTO } from '../dto/CategoryRequestDTO';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(category: CategoryRequestDTO) {
    const newCategory = await this.categoriesRepository.create(category);

    return newCategory;
  }
}

export default CreateCategoryService;
