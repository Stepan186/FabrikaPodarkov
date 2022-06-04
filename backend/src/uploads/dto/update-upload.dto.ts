import { IsNumber, IsString } from 'class-validator';

export class UpdateUploadDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
