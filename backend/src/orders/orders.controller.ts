import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { uuid } from 'aws-sdk/clients/customerprofiles';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Delete(':orderId')
  delete(@Param() orderId: uuid) {
    return this.ordersService.deleteOneOrder(orderId);
  }

  @Put(':id')
  update(@Param() orderId: uuid, @Body() dto: UpdateOrderDto) {
    return this.ordersService.updateOrder(orderId, dto);
  }

  @Get()
  getAll() {
    return this.ordersService.getOrders();
  }

  @Get('orderId')
  getOne(@Param('orderId') orderId: uuid) {
    return this.ordersService.getOrder(orderId);
  }
}
