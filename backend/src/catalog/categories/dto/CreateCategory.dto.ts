import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name!: string;

  @IsInt()
  ordering!: number;

  @IsOptional()
  @IsInt()
  image?: number;
}
