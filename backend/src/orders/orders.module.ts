import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { DadataModule } from '../dadata/dadata.module';
import { HttpModule } from '@nestjs/axios';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { CartModule } from '../carts/cart.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Order, OrderItem]),
    DadataModule,
    HttpModule,
    CartModule,
  ],
  exports: [],
  controllers: [OrdersController, OrderItemsController],
  providers: [OrdersService, OrderItemsService],
})
export class OrdersModule {}
