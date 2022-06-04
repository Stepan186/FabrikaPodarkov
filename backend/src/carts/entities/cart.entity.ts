import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { CartItem } from './cart-item.entity';
import { v4 } from 'uuid';

@Entity()
export class Cart extends BaseEntity<Cart, 'id'> {
  @PrimaryKey()
  id: string = v4;
  [PrimaryKeyType]: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems = new Collection<CartItem>(this);

  @Property({ persist: false })
  get total() {
    return this.cartItems.getItems().reduce((acc, i) => acc + i.total, 0);
  }
}
