import { Allow, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePromoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  image: number;
}
