import { Global, Module, OnModuleInit } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SmsModule } from '../sms/sms.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PasswordService } from './password.service';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permission.service';
import { PermissionsController } from './permission.controller';
import { JwtModule } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  imports: [
    UsersModule,
    SmsModule,
    JwtModule.register({
      secret: 'some secret key',
      signOptions: { expiresIn: `${60 * 24}m` },
    }),
    MikroOrmModule.forFeature([Permission]),
  ],
  controllers: [AuthController, PermissionsController],
  providers: [AuthService, PermissionsService, PasswordService],
  exports: [AuthService, JwtModule, PasswordService, PermissionsService],
})
export class AuthModule implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const permissionsService = await this.moduleRef.resolve(PermissionsService);
    await permissionsService.syncPermissions();
  }
}
