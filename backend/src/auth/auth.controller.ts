import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { GetCodeDto } from './dto/get-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() data: LogInDto) {
    return await this.service.login(data);
  }

  @UsePipes(ValidationPipe)
  @Post('send-code')
  async sendSmsCode(@Body() data: GetCodeDto) {
    return this.service.registerAndSendCode(data.phone);
  }
}
