import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { OrderItem } from './entities/order-item.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: EntityRepository<OrderItem>,
  ) {}

  async getItems() {
    return this.orderItemRepository.findAll();
  }

  async updateOrderItem(orderItemId: number, dto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOne(orderItemId);
    orderItem.assign(dto);
    await this.orderItemRepository.flush();
    return orderItem;
  }
}
