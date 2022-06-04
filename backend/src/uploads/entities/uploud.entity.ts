import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

export class UploadedImage {
  public url: string;
  public width: number;
  public height: number;
  public size: number;
  public key: string;

  constructor(opts: Partial<UploadedImage>) {
    Object.assign(this, opts);
  }
}

@Entity()
export class Upload extends BaseEntity<Upload, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  public key: string;

  @Property()
  url: string;

  @Property()
  type: string;

  @Property()
  name: string;

  @Property()
  size: number;

  @Property({ type: 'jsonb', nullable: true })
  sizes: UploadedImage[];
}
