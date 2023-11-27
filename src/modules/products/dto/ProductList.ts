import { CategoryShow } from '@modules/categories/dto/CategoryShow';

export interface ProductList {
  id: string;
  name: string;
  imagePath: string;
  price: number;
  category: CategoryShow | null;
}
