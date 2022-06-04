import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../uploads/entities/uploud.entity';
import { Tag } from '../tags/tag.entity';
import { Category } from '../categories/category.entity';

@Entity()
export class ProductGroup extends BaseEntity<ProductGroup, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToOne(() => Upload)
  image: number;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToMany(() => Tag, 'productGroups', { owner: true, eager: true })
  tags = new Collection<Tag>(this);
}
