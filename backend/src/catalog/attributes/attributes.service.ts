import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Attribute } from './attribute.entity';
import { EntityRepository } from '@mikro-orm/core';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { CreateAttributesDto } from './dto/create-attributes.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: EntityRepository<Attribute>,
  ) {}

  async createAttribute(dto: CreateAttributesDto) {
    const attribute = this.attributesRepository.create(dto);
    await this.attributesRepository.persistAndFlush(attribute);
    return attribute;
  }

  async getOne(attributeId: number) {
    return await this.attributesRepository.findOne(attributeId);
  }

  async findAll() {
    return await this.attributesRepository.findAll();
  }

  async delete(attributeId: number) {
    await this.attributesRepository.nativeDelete(attributeId);
  }

  async updateAttribute(attributeId: number, dto: UpdateAttributeDto) {
    const attribute = await this.attributesRepository.findOne(attributeId);
    attribute.assign(dto);
    await this.attributesRepository.persist(attribute);
    return attribute;
  }
}
