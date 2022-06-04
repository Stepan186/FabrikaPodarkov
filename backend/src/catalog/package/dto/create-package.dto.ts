import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  metaTitle: string;

  @IsOptional()
  @IsString()
  metaDescription: string;

  @IsInt()
  image: number;
}
