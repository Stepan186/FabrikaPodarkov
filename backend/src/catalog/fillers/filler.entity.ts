import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Filler extends BaseEntity<Filler, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  description: string;
}
