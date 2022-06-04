import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: EntityRepository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(dto);
    await this.categoriesRepository.persistAndFlush(category);
    return category;
  }

  async getAllCategories() {
    return await this.categoriesRepository.findAll();
  }

  async deleteCategory(categoryId) {
    await this.categoriesRepository.nativeDelete(categoryId);
  }

  async updateCategory(categoryId: number, dto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne(categoryId);
    category.assign(dto);
    await this.categoriesRepository.flush();
    return category;
  }
}
