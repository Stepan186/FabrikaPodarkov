import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from '../../catalog/products/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem extends BaseEntity<CartItem, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  count: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Cart, { onDelete: 'cascade' })
  cart: Cart;

  @Property({ persist: false })
  get total() {
    return this.product.price * this.count;
  }
}
