import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Promo } from './entities/promo.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UpdatePromoDto } from './dto/update-promo.dto';

@Injectable()
export class PromosService {
  constructor(
    @InjectRepository(Promo)
    private promoRepository: EntityRepository<Promo>,
  ) {}

  async createPromo(dto) {
    const promo = await this.promoRepository.create(dto);
    await this.promoRepository.persistAndFlush(promo);
    return promo;
  }

  async getAllPromos() {
    return await this.promoRepository.findAll();
  }

  async deleteOne(id: number) {
    const promo = await this.promoRepository.findOne(id);
    await this.promoRepository.removeAndFlush(promo);
  }

  async update(id: number, dto: UpdatePromoDto) {
    const promo = await this.promoRepository.findOne(id);
    promo.assign(dto);
  }
}
