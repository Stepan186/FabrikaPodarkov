import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LogInDto } from './dto/log-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { CallCodeService } from '../sms/call-code.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private callCodeService: CallCodeService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async decodeJwt(token: string) {
    const data = this.jwtService.verify(token);
    return this.usersService.findOne(data.id);
  }

  async login(data: LogInDto) {
    const user = await this.usersService.findByPhone(data.phone);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (data.code) {
      await this.callCodeService.verifyCode(data.phone, data.code);
    } else {
      await this.passwordService.verifyPassword(user, data.password);
    }

    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      permissions: user.permissions,
      isAdmin: user.isAdmin,
    };
    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '365d',
      }),
      user: await this.usersService.getProfile(user.id),
    };
  }

  async registerAndSendCode(phone: string) {
    const user = await this.usersService.getOrCreate({ phone });
    await this.callCodeService.call(user.phone);
    return 1;
  }
}
