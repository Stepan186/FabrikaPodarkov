import { IsString, Length, ValidateIf } from 'class-validator';

export class LogInDto {
  @IsString()
  @Length(11, 11)
  phone: string;

  @ValidateIf((o) => !o.password, {
    message: 'Необходимо указать код подтверждения',
  })
  @IsString()
  code: string;

  @ValidateIf((o) => !o.code, { message: 'Необходимо указать пароль' })
  @IsString()
  password: string;
}
