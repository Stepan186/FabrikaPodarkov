import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { SYSTEM_PERMISSIONS } from './permission.service';

@Controller('permissions')
export class PermissionsController {
  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  async getPermissions() {
    return SYSTEM_PERMISSIONS;
  }
}
