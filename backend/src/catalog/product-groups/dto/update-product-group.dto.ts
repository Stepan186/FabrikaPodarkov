import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class UpdateProductGroupDto {
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
