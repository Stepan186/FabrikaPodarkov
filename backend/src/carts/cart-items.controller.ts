import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemsService } from './cart-items.service';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly service: CartItemsService) {}

  @Post()
  create(@Body() dto: CreateCartItemDto) {
    return this.service.addItem(dto);
  }

  @Get()
  getAll() {
    return this.service.getItems();
  }

  @Delete(':cartItemId')
  delete(@Param() cartItemId: number) {
    return this.service.removeItem(cartItemId);
  }
}
