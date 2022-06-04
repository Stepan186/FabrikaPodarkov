import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  firstName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  comment: string;
}
