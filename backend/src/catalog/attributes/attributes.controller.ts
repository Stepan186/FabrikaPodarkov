import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributesDto } from './dto/create-attributes.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly service: AttributesService) {}

  @Post()
  create(@Body() dto: CreateAttributesDto) {
    return this.service.createAttribute(dto);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param() attributeId: number, dto: UpdateAttributeDto) {
    return this.service.updateAttribute(attributeId, dto);
  }

  @Delete(':attributeId')
  delete(@Param() attributeId: number) {
    return this.service.delete(attributeId);
  }
}
