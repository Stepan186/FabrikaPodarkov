import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';

const ENDPOINT = 'https://smsc.ru/sys/send.php';

@Injectable()
export class CallCodeService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

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
            {
              message: 'Неправильный номер.',
            },
            400,
          );
        default:
          throw new HttpException(
            {
              message: 'Ошибка звонка. Пожалуйста, повторите позже.',
            },
            400,
          );
      }
    } else {
      let code = String(res.data.code);
      code = code.substring(code.length - 4);
      await this.cache.set(this.getCacheKey(phone), code, {
        ttl: 300,
      });
      return code;
    }
  }

  async verifyCode(phone: string, code: string) {
    const cacheKey = this.getCacheKey(phone);
    const cachedCode = await this.cache.get(cacheKey);
    console.log(cachedCode);
    if (!cachedCode || cachedCode != code) {
      throw new UnauthorizedException();
    }
    await this.cache.del(cacheKey);
    return 1;
  }

  getCacheKey(phone: string): string {
    return `phone-verification.${phone}.code`;
  }
}
