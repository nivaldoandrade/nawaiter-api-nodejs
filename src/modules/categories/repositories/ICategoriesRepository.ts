import { CategoryRequestDTO } from '../dto/CategoryRequestDTO';
import { CategoryShow } from '../dto/CategoryShow';

export interface ICategoriesRepository {
  findAll(
    page: number,
    limit: number,
  ): Promise<{ categories: CategoryShow[]; totalCount: number }>;
  create(category: CategoryRequestDTO): Promise<CategoryShow>;
  findByIdUnique(id: string): Promise<string | null>;
  findById(id: string): Promise<CategoryShow | null>;
  update(id: string, category: CategoryRequestDTO): Promise<CategoryShow>;
  delete(id: string): Promise<void>;
}
