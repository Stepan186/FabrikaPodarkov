import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from './cart.service';
import { CartItemsService } from './cart-items.service';
import { CartController } from './cart.controller';
import { CartItemsController } from './cart-items.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Cart, CartItem])],
  exports: [CartService, CartItemsService],
  providers: [CartService, CartItemsService],
  controllers: [CartController, CartItemsController],
})
export class CartModule {}
