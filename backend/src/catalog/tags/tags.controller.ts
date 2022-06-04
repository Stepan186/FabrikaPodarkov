import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateProductsDto } from '../products/dto/create-products.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  create(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @Get(':id')
  getOne(@Param() id: number) {
    return this.tagsService.getTag(id);
  }

  @Get()
  getAll() {
    return this.tagsService.getTags();
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.tagsService.deleteOne(id);
  }

  @Put(':id')
  update(@Param() productId: number, @Body() dto: UpdateTagDto) {
    return this.tagsService.updateTag(productId, dto);
  }
}
