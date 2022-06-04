import { IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  ordering: number;

  @IsNumber()
  image: number;
}
