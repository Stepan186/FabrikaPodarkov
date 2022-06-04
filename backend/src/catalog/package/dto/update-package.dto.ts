import { IsString } from 'class-validator';

export class UpdatePackageDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
