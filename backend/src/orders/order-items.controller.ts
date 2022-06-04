import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Get()
  getAll() {
    return this.orderItemsService.getItems();
  }

  @Put(':id')
  update(@Param() orderItemId: number, @Body() dto: UpdateOrderItemDto) {
    return this.orderItemsService.updateOrderItem(orderItemId, dto);
  }
}
