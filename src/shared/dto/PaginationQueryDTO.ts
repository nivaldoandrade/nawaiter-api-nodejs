import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationQueryDTO {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number;

  @IsString()
  @IsOptional()
  dateStart: string;

  @IsString()
  @IsOptional()
  dateEnd: string;
}
