import { IsNumber, IsUUID } from 'class-validator';
import { uuid } from 'aws-sdk/clients/customerprofiles';

export class UpdateOrderItemDto {
  @IsNumber()
  count: number;

  @IsNumber()
  price: number;

  @IsNumber()
  product: number;

  @IsUUID()
  order: uuid;
}
