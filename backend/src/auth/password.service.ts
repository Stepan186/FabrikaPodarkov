import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class PasswordService {
  async verifyPassword(user: User, password: string) {
    if (!user.password || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  public getRandomPassword(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
