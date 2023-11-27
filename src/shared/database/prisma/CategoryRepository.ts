import { Prisma, PrismaClient } from '@prisma/client';

import { CategoryRequestDTO } from '@modules/categories/dto/CategoryRequestDTO';
import { CategoryShow } from '@modules/categories/dto/CategoryShow';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

class CategoryRepository implements ICategoriesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ categories: CategoryShow[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const query: Prisma.CategoryFindManyArgs = {
      skip,
      take: limit,
    };

    const [categories, count] = await this.prisma.$transaction([
      this.prisma.category.findMany(query),
      this.prisma.category.count(),
    ]);

    return { categories, totalCount: count };
  }

  async create(category: CategoryRequestDTO): Promise<CategoryShow> {
    return this.prisma.category.create({
      data: category,
    });
  }

  async findByIdUnique(id: string): Promise<string | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    return category?.id ?? null;
  }

  async findById(id: string): Promise<CategoryShow | null> {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });

    return category;
  }

  async update(
    id: string,
    { name, icon }: CategoryRequestDTO,
  ): Promise<CategoryShow> {
    const category = await this.prisma.category.update({
      where: { id },
      data: { name, icon },
    });

    return category;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

export default CategoryRepository;
