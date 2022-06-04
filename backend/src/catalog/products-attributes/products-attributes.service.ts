import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { UpdateProductAttributesDto } from './dto/update-product-attributes.dto';
import { ProductAttribute } from './product-attribute.entity';

@Injectable()
export class ProductsAttributesService {
  constructor(
    @InjectRepository(ProductAttribute)
    private productAttributeRepository: EntityRepository<ProductAttribute>,
  ) {}

  async create(dto) {
    const productAttribute = this.productAttributeRepository.create(dto);
    await this.productAttributeRepository.persistAndFlush(productAttribute);
    return productAttribute;
  }

  async findAll() {
    return this.productAttributeRepository.findAll();
  }

  async deleteOne(id: number) {
    await this.productAttributeRepository.nativeDelete(id);
  }

  async updateOne(id: number, dto: UpdateProductAttributesDto) {
    const productAttribute = await this.productAttributeRepository.findOne(id);
    productAttribute.assign(dto);
    await this.productAttributeRepository.flush();
    return productAttribute;
  }
}
