import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../uploads/entities/uploud.entity';

@Entity()
export class Package extends BaseEntity<Package, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  slug: string;

  @Property()
  description: string;

  @Property({ nullable: true })
  metaTitle: string;

  @Property({ nullable: true })
  metaDescription: string;

  @ManyToOne(() => Upload)
  image: number;
}
