import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from './product.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateProductsDto } from './dto/create-products.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: EntityRepository<Product>,
    private axios: HttpService,
  ) {}

  async createProducts(dto: CreateProductsDto) {
    const product = this.productsRepository.create(dto);
    await this.productsRepository.persistAndFlush(product);
    return product;
  }

  async getProduct(product_id) {
    return await this.productsRepository.findOne(product_id);
  }

  async getProducts() {
    return this.productsRepository.findAll();
  }

  async deleteOne(product_id) {
    await this.productsRepository.nativeDelete(product_id);
  }

  async updateProduct(productId, dto) {
    const product = await this.productsRepository.findOne(productId);
    product.assign(dto);
    await this.productsRepository.flush();
    return product;
  }
}
