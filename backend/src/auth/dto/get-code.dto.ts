import { IsIn, IsOptional, IsString, Length } from 'class-validator';

export class GetCodeDto {
  @IsString({ message: 'Необходимо указать телефон.' })
  @Length(11, 11, { message: 'Необходимо указать телефон.' })
  phone: string;

  @IsOptional()
  @IsIn(['call', 'sms'])
  channel: 'call' | 'sms' = 'call';
}
