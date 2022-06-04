import { IsString } from 'class-validator';

export class CreateFillerDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
