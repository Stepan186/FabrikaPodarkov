import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

export enum PermissionType {
  GrantAdminAccess = 'admin.grant',
  ViewAllClaims = 'claims.viewAll',
  EditAllClaims = 'claims.editAll',
  CreateClaims = 'claims.create',
  EditBuildings = 'buildings.edit',
  ViewUsers = 'users.view',
  EditUsers = 'users.edit',
  EditBoards = 'boards.edit',
  EditSettings = 'settings.edit',
  ViewCalls = 'calls.view',
}

@Entity()
export class Permission extends BaseEntity<Permission, 'id'> {
  @PrimaryKey({ type: 'string' })
  id: PermissionType;

  @Property()
  description: string;
}
