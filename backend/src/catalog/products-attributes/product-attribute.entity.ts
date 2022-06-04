import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from '../products/product.entity';
import { Attribute } from '../attributes/attribute.entity';

@Entity()
export class ProductAttribute extends BaseEntity<ProductAttribute, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  value: string | number;

  @Property()
  isChoisable: boolean;

  @ManyToOne()
  product: Product;

  @ManyToOne()
  attribute: Attribute;
}
