import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class IngredientDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}

export class ProductRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsString({ message: 'imagePath must be a image' })
  @IsNotEmpty()
  imagePath: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IngredientDTO)
  ingredients: IngredientDTO[];
}
