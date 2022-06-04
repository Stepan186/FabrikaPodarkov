import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Promo } from './entities/promo.entity';
import { PromosService } from './promos.service';
import { PromosController } from './promos.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Promo])],
  exports: [],
  providers: [PromosService],
  controllers: [PromosController],
})
export class PromosModule {}
