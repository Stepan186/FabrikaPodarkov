import {
  BaseEntity,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../uploads/entities/uploud.entity';
import { ProductGroup } from '../product-groups/product-group.entity';
import { Category } from '../categories/category.entity';
import { ProductAttribute } from '../products-attributes/product-attribute.entity';

@Entity()
export class Product extends BaseEntity<Product, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  title!: string;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => ProductGroup)
  productGroup: ProductGroup;

  @Property({ nullable: true })
  salePrice: number;

  @Property({ default: false })
  isNew!: boolean;

  @Property({ default: false })
  isPopular: boolean;

  @Property({ columnType: 'decimal(5,2)' })
  price!: number;

  @Property({ nullable: true })
  description!: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Upload, { nullable: true })
  image: number;

  @OneToMany(
    () => ProductAttribute,
    (productAttribute) => productAttribute.product,
    { nullable: true },
  )
  productAttributes = new Collection<ProductAttribute>(this);
}
