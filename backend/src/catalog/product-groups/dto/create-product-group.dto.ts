import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateProductGroupDto {
  @IsString()
  name: string;

  @IsNumber()
  image: number;

  @IsNumber()
  category: number;

  @IsArray()
  @IsInt({ each: true })
  tags: number[];
}
