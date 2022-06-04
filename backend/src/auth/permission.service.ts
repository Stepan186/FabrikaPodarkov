import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Permission, PermissionType } from './entities/permission.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

export const SYSTEM_PERMISSIONS = [
  {
    id: PermissionType.GrantAdminAccess,
    description: 'Назначение администраторов',
  },
  {
    id: PermissionType.ViewAllClaims,
    description: 'Просмотр всех заявок',
  },
  {
    id: PermissionType.EditAllClaims,
    description: 'Редактирование любой заявки',
  },
  {
    id: PermissionType.ViewUsers,
    description: 'Просмотр списка пользователей и сотрудников',
  },
  {
    id: PermissionType.EditUsers,
    description: 'Редактирование пользователей',
  },
  {
    id: PermissionType.EditSettings,
    description: 'Редактирование настроек системы',
  },
  {
    id: PermissionType.ViewCalls,
    description: 'Просмотр списка звонков',
  },
  {
    id: PermissionType.EditBuildings,
    description: 'Редактирование объектов и помещений',
  },
  {
    id: PermissionType.EditBoards,
    description: 'Редактирование объявлений',
  },
  {
    id: PermissionType.CreateClaims,
    description: 'Создание обращений',
  },
];

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private repo: EntityRepository<Permission>,
  ) {}

  async syncPermissions() {
    const ids = SYSTEM_PERMISSIONS.map((i) => i.id);
    await this.repo.nativeDelete({
      $not: {
        id: {
          $in: ids,
        },
      },
    });

    await this.repo
      .createQueryBuilder()
      .insert(SYSTEM_PERMISSIONS)
      .onConflict('id')
      .merge()
      .execute();

    console.log('successfully created permissions');
  }

  async getAll() {
    return this.repo.findAll();
  }
}
