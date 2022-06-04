import { IsString } from 'class-validator';

export class UpdateFillerDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
