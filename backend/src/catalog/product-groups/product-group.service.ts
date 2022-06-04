import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ProductGroup } from './product-group.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';

@Injectable()
export class ProductGroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private repo: EntityRepository<ProductGroup>,
  ) {}

  async createProductGroup(dto: CreateProductGroupDto) {
    const productGroup = this.repo.create(dto);
    await this.repo.persistAndFlush(productGroup);
    return productGroup;
  }

  async getProductGroups() {
    return this.repo.findAll();
  }

  async getProductGroup(productGroupId: number) {
    return this.repo.findOne(productGroupId);
  }

  async deleteProductGroup(productGroupId: number) {
    await this.repo.nativeDelete(productGroupId);
  }

  async updateProductGroup(productGroupId: number, dto: UpdateProductGroupDto) {
    const productGroup = await this.repo.findOne(productGroupId);
    console.log(productGroup);
    productGroup.assign(dto);
    await this.repo.flush();
    return productGroup;
  }
}
