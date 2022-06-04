import { Allow, IsBoolean, IsNumber } from 'class-validator';

export class UpdateProductAttributesDto {
  @IsNumber()
  product: number;

  @IsNumber()
  attribute: number;

  @Allow()
  value: string;

  @IsBoolean()
  isChoisable: boolean;
}
