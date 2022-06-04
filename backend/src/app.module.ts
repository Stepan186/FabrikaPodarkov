import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CatalogModule } from './catalog/catalog.module';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';
import { PromosModule } from './promos/promos.module';
import mikroOrmConfig from './mikro-orm.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { CartModule } from './carts/cart.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      ...mikroOrmConfig,
      scope: Scope.REQUEST,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    UsersModule,
    AuthModule,
    OrdersModule,
    CatalogModule,
    UploadsModule,
    PromosModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule, MailerModule],
})
export class AppModule {}
