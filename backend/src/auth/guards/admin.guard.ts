import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/user.entity';

export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return user?.isAdmin;
  }
}
