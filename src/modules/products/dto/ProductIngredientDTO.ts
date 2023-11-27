import { Expose } from 'class-transformer';

export class ProductIngredientDTO {
  @Expose()
  icon: string;

  @Expose()
  name: string;
}
