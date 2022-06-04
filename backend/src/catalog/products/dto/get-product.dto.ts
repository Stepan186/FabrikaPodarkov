import { IsDecimal, IsObject, IsString } from 'class-validator';
import { Category } from '../../categories/category.entity';

export class GetProductDto {
  @IsString()
  title: string;

  @IsObject()
  category: Category;

  @IsDecimal()
  salePrice: number;

  @IsDecimal()
  price: number;

  @IsString()
  description: string;
}
