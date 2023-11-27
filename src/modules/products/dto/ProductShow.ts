import { CategoryShow } from '@modules/categories/dto/CategoryShow';

import { ProductIngredientDTO } from './ProductIngredientDTO';

export class ProductShow {
  id: string;

  name: string;

  description?: string | null | undefined;

  imagePath: string;

  price: number;

  createdAt: Date;

  updatedAt: Date;

  ingredients?: ProductIngredientDTO[] | null;

  category: CategoryShow | null;
}
