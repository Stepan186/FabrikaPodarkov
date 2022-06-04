import { IsEnum, IsString } from 'class-validator';
import { AttributeType } from '../attribute.entity';

export class CreateAttributesDto {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsEnum(AttributeType)
  type: AttributeType;

  @IsString()
  options: string;
}
