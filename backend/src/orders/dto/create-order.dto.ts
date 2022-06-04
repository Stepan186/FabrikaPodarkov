import { IsNumber, IsString, IsUUID } from 'class-validator';
import { uuid } from 'aws-sdk/clients/customerprofiles';

export class CreateOrderDto {
  @IsString()
  firstName: string;

  @IsString()
  phone: string;

  @IsUUID('all')
  cart: uuid;
}
