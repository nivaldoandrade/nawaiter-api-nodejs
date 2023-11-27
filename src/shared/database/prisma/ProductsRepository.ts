import { Prisma, PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { ProductIngredientDTO } from '@modules/products/dto/ProductIngredientDTO';
import { ProductList } from '@modules/products/dto/ProductList';
import { ProductRequestDTO } from '@modules/products/dto/ProductRequestDTO';
import { ProductShow } from '@modules/products/dto/ProductShow';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    products: ProductList[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;

    const [products, count] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          imagePath: true,
          price: true,
          category: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.product.count(),
    ]);

    return { products, totalCount: count };
  }

  async create(product: ProductRequestDTO): Promise<ProductList> {
    const { name, description, category, imagePath, price, ingredients } =
      product;

    const ingredientsJson = ingredients as unknown as Prisma.JsonObject;

    const newProduct = await this.prisma.product.create({
      select: {
        id: true,
        name: true,
        imagePath: true,
        price: true,
        category: {
          select: {
            id: true,
            icon: true,
            name: true,
          },
        },
      },
      data: {
        name,
        description,
        categoryId: category,
        imagePath,
        price,
        ingredients: ingredientsJson,
      },
    });
    return newProduct;
  }

  async findById(id: string): Promise<ProductShow | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return null;
    }

    const ingredientsArray = product.ingredients as Prisma.JsonArray;

    let ingredientsFormatted;

    if (ingredientsArray) {
      ingredientsFormatted = ingredientsArray.map((ingredient) =>
        plainToInstance(ProductIngredientDTO, ingredient, {
          excludeExtraneousValues: true,
        }),
      );
    }

    return {
      ...product,
      ingredients: ingredientsFormatted,
    };
  }

  async getProductDetailsById(id: string): Promise<{
    id: string;
    categoryId: string | null;
    imagePath: string;
  } | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, categoryId: true, imagePath: true },
    });

    return product;
  }

  async findByCategoryId(categoryId: string): Promise<boolean> {
    const product = await this.prisma.product.findFirst({
      where: {
        categoryId,
      },
    });

    return !!product;
  }

  async update(
    id: string,
    {
      name,
      description,
      category,
      imagePath,
      price,
      ingredients,
    }: ProductRequestDTO,
  ): Promise<ProductList> {
    const product = await this.prisma.product.update({
      select: {
        id: true,
        name: true,
        imagePath: true,
        price: true,
        category: {
          select: {
            id: true,
            icon: true,
            name: true,
          },
        },
      },
      where: {
        id,
      },
      data: {
        name,
        description,
        categoryId: category,
        imagePath,
        price,
        ingredients: ingredients as unknown as Prisma.JsonArray,
      },
    });

    return product;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}

export default ProductsRepository;
