import { IsString } from "class-validator";

export class UpdatePasswordDto {

  @IsString()
  code: string

  @IsString()
  password: string
}