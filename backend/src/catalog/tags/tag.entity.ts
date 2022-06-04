import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProductGroup } from '../product-groups/product-group.entity';

@Entity()
export class Tag extends BaseEntity<Tag, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToMany(() => ProductGroup, (productGroup) => productGroup.tags)
  productGroups = new Collection<ProductGroup>(this);
}
