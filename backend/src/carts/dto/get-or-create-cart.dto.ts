import { IsOptional, IsUUID } from 'class-validator';
import { uuid } from 'aws-sdk/clients/customerprofiles';

export class GetOrCreateCartDto {
  @IsOptional()
  @IsUUID()
  id: uuid;
}
