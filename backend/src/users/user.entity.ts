import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  OnLoad,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Permission, PermissionType } from '../auth/entities/permission.entity';
import { SYSTEM_PERMISSIONS } from '../auth/permission.service';
import { v4 } from 'uuid';

@Entity()
export class User extends BaseEntity<User, 'id'> {
  @PrimaryKey()
  id: string = v4;
  [PrimaryKeyType]: string;

  @Property({ nullable: true })
  email: string;

  @Property()
  phone: string;

  @Property({ nullable: true })
  firstName: string;

  @Property({ nullable: true })
  lastName: string;

  @Property({ nullable: true, hidden: true })
  password!: string;

  @Property({ default: false })
  isAdmin?: boolean;

  @ManyToMany(() => Permission, null, { hidden: true })
  permissions = new Collection<Permission>(this);

  @Property({ persist: false, serializedName: 'permissions' })
  permissionsIds(): PermissionType[] {
    if (!this.permissions.isInitialized()) {
      return undefined;
    }
    if (this.isSuperAdmin()) {
      return SYSTEM_PERMISSIONS.map((i) => i.id);
    } else {
      return this.permissions.getIdentifiers();
    }
  }

  async can(...permissions: PermissionType[]): Promise<boolean> {
    await this.permissions.init();
    const userPermissions = this.permissionsIds();
    return permissions.every((p) => userPermissions.includes(p));
  }

  isSuperAdmin() {
    return String(process.env.SUPERADMINS).split(',').includes(this.phone);
  }

  @OnLoad()
  overrideSuperAdminPermissions() {
    if (this.isSuperAdmin()) {
      this.isAdmin = true;
    }
  }
}
