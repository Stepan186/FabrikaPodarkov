import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Get()
  get() {
    return this.service.getAllCategories();
  }

  @Delete(':categoryId')
  delete(@Param() categoryId: string) {
    return this.service.deleteCategory(categoryId);
  }

  @Patch(':categoryId')
  update(@Param() categoryId: number, @Body() dto: UpdateCategoryDto) {
    return this.service.updateCategory(categoryId, dto);
  }
}
