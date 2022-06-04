import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsAttributesService } from './products-attributes.service';
import { CreateProductsAttributesDto } from './dto/create-products-attributes.dto';
import { UpdateProductAttributesDto } from './dto/update-product-attributes.dto';

@Controller('products-attributes')
export class ProductsAttributesController {
  constructor(private readonly service: ProductsAttributesService) {}

  @Post()
  create(@Body() dto: CreateProductsAttributesDto) {
    return this.service.create(dto);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.service.deleteOne(id);
  }

  @Patch(':id')
  update(@Param() id: number, @Body() dto: UpdateProductAttributesDto) {
    return this.service.updateOne(id, dto);
  }
}
