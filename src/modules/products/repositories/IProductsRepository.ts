import { ProductList } from '../dto/ProductList';
import { ProductRequestDTO } from '../dto/ProductRequestDTO';
import { ProductShow } from '../dto/ProductShow';

export interface IProductsRepository {
  create(product: ProductRequestDTO): Promise<ProductList>;
  findAll(
    page: number,
    limit: number,
  ): Promise<{
    products: ProductList[];
    totalCount: number;
  }>;
  findById(id: string): Promise<ProductShow | null>;
  getProductDetailsById(id: string): Promise<{
    id: string;
    categoryId: string | null;
    imagePath: string;
  } | null>;
  findByCategoryId(categoryId: string): Promise<boolean>;
  update(id: string, product: ProductRequestDTO): Promise<ProductList>;
  delete(id: string): Promise<void>;
}
