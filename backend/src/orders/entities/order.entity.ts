import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';

import { Cart } from '../../carts/entities/cart.entity';
import { OrderItem } from './order-item.entity';
import { v4 } from 'uuid';

export enum PaymentType {
  CARD = 'card',
  CASH = 'cash',
  ONLINE = 'online',
  INVOICE = 'invoice',
}

export enum ReceivingType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

export enum Status {
  NEW = 'new',
  WORK = 'work',
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
  DONE = 'done',
}

@Entity()
export class Order extends BaseEntity<Order, 'id'> {
  @PrimaryKey()
  id: string = v4;
  [PrimaryKeyType]: string;

  @Property()
  firstName: string;

  @Property()
  phone: string;

  @ManyToOne(() => Cart)
  cart: Cart;

  @OneToMany(() => OrderItem, (i) => i.order, {
    cascade: [Cascade.REMOVE],
  })
  items = new Collection<OrderItem>(this);

  @Property({ persist: false })
  get total() {
    return this.items.getItems().reduce((acc, i) => acc + i.total, 0);
  }
}
