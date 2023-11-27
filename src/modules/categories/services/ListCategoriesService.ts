import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface ILisCategoriesService {
  page: number;
  limit: number;
}

@injectable()
class LisCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ page, limit }: ILisCategoriesService) {
    return this.categoriesRepository.findAll(page, limit);
  }
}

export default LisCategoriesService;
