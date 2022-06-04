import { IS_UUID, IsNumber, IsUUID } from 'class-validator';
import { uuid } from 'aws-sdk/clients/customerprofiles';

export class CreateCartItemDto {
  @IsNumber()
  count: number;

  @IsNumber()
  product: number;

  @IsUUID('all')
  cartId: uuid;
}
