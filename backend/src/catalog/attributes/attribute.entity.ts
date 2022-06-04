import {
  BaseEntity,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Attribute extends BaseEntity<Attribute, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  unit: string;

  @Enum(() => AttributeType)
  type: AttributeType;

  @Property()
  options: string;
}

export enum AttributeType {
  STRING = 'string',
  INTEGER = 'integer',
  DOUBLE = 'double',
  SELECT = 'select',
}
