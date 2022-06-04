import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemsService } from './cart-items.service';
import { uuid } from 'aws-sdk/clients/customerprofiles';
import { GetOrCreateCartDto } from './dto/get-or-create-cart.dto';

@Controller('carts')
export class CartController {
  constructor(
    private cartService: CartService,
    private cartItemService: CartItemsService,
  ) {}

  @Post()
  create(@Body() dto: GetOrCreateCartDto) {
    return this.cartService.getOrCreate(dto);
  }

  @Get(':id')
  getOne(@Param() cartId: uuid) {
    return this.cartService.getOne(cartId);
  }

  @Delete(':id')
  deleteItems(@Param() cartId: uuid) {
    return this.cartItemService.clearCart(cartId);
  }
}
