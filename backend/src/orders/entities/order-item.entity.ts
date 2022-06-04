import {
  BaseEntity,
  Entity,
  Formula,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from '../../catalog/products/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends BaseEntity<OrderItem, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  count: number;

  @Property({ columnType: 'decimal(5,2)' })
  price: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order)
  order: Order;

  @Property({ persist: false })
  get total() {
    return this.product.price * this.count;
  }
}
