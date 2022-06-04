import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepository: EntityRepository<Tag>,
  ) {}

  async createTag(dto) {
    const tag = this.tagRepository.create(dto);
    await this.tagRepository.persistAndFlush(tag);
    return tag;
  }

  async getTags() {
    return await this.tagRepository.findAll();
  }

  async getTag(tagId) {
    return await this.tagRepository.findOne(tagId);
  }

  async updateTag(tagId, dto) {
    const tag = await this.tagRepository.findOne(tagId);
    tag.assign(dto);
    await this.tagRepository.flush();
    return tag;
  }

  async deleteOne(tagId) {
    const tag = await this.tagRepository.findOne(tagId);
    await this.tagRepository.nativeDelete(tag);
  }
}
