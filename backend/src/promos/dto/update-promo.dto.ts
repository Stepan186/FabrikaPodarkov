import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePromoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  image: number;
}
