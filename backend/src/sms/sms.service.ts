import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const ENDPOINT = 'https://smsc.ru/sys/send.php';

@Injectable()
export class SmsService {
  constructor(private httpService: HttpService) {}

  async sendSms(phone: string, body: string) {
    return await firstValueFrom(
      this.httpService.get(ENDPOINT, {
        params: {
          login: process.env.SMSC_LOGIN,
          psw: process.env.SMSC_PASSWORD,
          phones: phone,
          mes: body,
        },
      }),
    );
  }

  async call(phone: string) {
    const res = await firstValueFrom(
      this.httpService.get(ENDPOINT, {
        params: {
          login: process.env.SMSC_LOGIN,
          psw: process.env.SMSC_PASSWORD,
          phones: phone,
          mes: 'code',
          call: 1,
          fmt: 3,
        },
      }),
    );
    if (res.data.error_code) {
      switch (res.data.error_code) {
        case 7:
          throw new HttpException(
            'Неправильный номер.',
            HttpStatus.BAD_REQUEST,
          );
        default:
          throw new HttpException(
            'Ошибка звонка. Пожалуйста, повторите позже.',
            HttpStatus.BAD_REQUEST,
          );
      }
    } else {
      return res.data.code.substr(-4);
    }
  }
}
