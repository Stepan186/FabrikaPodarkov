import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';

@Controller('product-groups')
export class ProductGroupController {
  constructor(private service: ProductGroupService) {}

  @Post()
  create(@Body() dto: CreateProductGroupDto) {
    return this.service.createProductGroup(dto);
  }

  @Get()
  getAll() {
    return this.service.getProductGroups();
  }

  @Get(':productGroupId')
  getOne(@Param('productGroupId') productGroupId: number) {
    return this.service.getProductGroup(productGroupId);
  }

  @Put(':id')
  update(@Param() productGroupId: number, @Body() dto: UpdateProductGroupDto) {
    return this.service.updateProductGroup(productGroupId, dto);
  }

  @Delete(':productGroupId')
  delete(@Param('productGroupId') productGroupId: number) {
    return this.service.deleteProductGroup(productGroupId);
  }
}
