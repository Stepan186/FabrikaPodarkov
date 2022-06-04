import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductsDto) {
    return this.service.createProducts(dto);
  }

  @Get(':id')
  getOne(@Param() id: number) {
    return this.service.getProduct(id);
  }

  @Get()
  getAll() {
    return this.service.getProducts();
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.service.deleteOne(id);
  }

  @Put(':id')
  update(@Param() productId: number, @Body() dto: UpdateProductDto) {
    return this.service.updateProduct(productId, dto);
  }
}
