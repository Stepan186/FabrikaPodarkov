import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Filler } from './filler.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateFillerDto } from './dto/create-filler.dto';
import { UpdateFillerDto } from './dto/update-filler.dto';

@Injectable()
export class FillersService {
  constructor(
    @InjectRepository(Filler)
    private fillerRepository: EntityRepository<Filler>,
  ) {}

  async createFiller(dto: CreateFillerDto) {
    const filler = await this.fillerRepository.create(dto);
    await this.fillerRepository.persistAndFlush(filler);
    return filler;
  }

  async getFillers() {
    return await this.fillerRepository.findAll();
  }

  async getFiller(fillerId: number) {
    return await this.fillerRepository.findOne(fillerId);
  }

  async updateFiller(orderId: number, dto: UpdateFillerDto) {
    const filler = await this.fillerRepository.findOne(orderId);
    filler.assign(dto);
    await this.fillerRepository.flush();
    return filler;
  }

  async deleteOne(fillerId: number) {
    await this.fillerRepository.nativeDelete(fillerId);
  }
}
