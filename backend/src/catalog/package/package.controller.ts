import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('packages')
export class PackingsController {
  constructor(private packageService: PackageService) {}

  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packageService.createPackage(dto);
  }

  @Get()
  getAll() {
    return this.packageService.getPackages();
  }

  @Get(':packageId')
  getOne(@Param() packageId: number) {
    return this.packageService.getPackage(packageId);
  }

  @Put(':packageId')
  update(@Param() packageId: number, @Body() dto: UpdatePackageDto) {
    return this.packageService.updatePackage(packageId, dto);
  }

  @Delete(':packageId')
  delete(@Param() packageId: number) {
    return this.packageService.deleteOne(packageId);
  }
}
