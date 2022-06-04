import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../uploads/entities/uploud.entity';

@Entity()
export class Category extends BaseEntity<Category, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  ordering!: number;

  @ManyToOne(() => Upload, { nullable: true })
  image?: Upload;
}
