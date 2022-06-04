import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductAttribute } from '../../products-attributes/product-attribute.entity';

export class CreateProductsDto {
  @IsString()
  title: string;

  @IsNumber()
  productGroup: number;

  @IsNumber()
  category: number;

  @IsBoolean()
  isNew: boolean;

  @IsNumber()
  price: number;

  @IsBoolean()
  isPopular: boolean;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  image: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  fillers: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  productAttribute: ProductAttribute;
}
