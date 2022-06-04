import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Package } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: EntityRepository<Package>,
  ) {}

  async createPackage(dto: CreatePackageDto) {
    const packing = await this.packageRepository.create(dto);
    await this.packageRepository.persistAndFlush(packing);
    return packing;
  }

  async getPackages() {
    return await this.packageRepository.findAll();
  }

  async getPackage(packageId: number) {
    return await this.packageRepository.findOne(packageId);
  }

  async updatePackage(packageId: number, dto: UpdatePackageDto) {
    const packing = await this.packageRepository.findOne(packageId);
    packing.assign(dto);
    await this.packageRepository.flush();
    return packing;
  }

  async deleteOne(packageId: number) {
    await this.packageRepository.nativeDelete(packageId);
  }
}
