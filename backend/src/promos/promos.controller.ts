import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PromosService } from './promos.service';
import { CreatePromoDto } from './dto/create-promo.dto';

@Controller('promos')
export class PromosController {
  constructor(private readonly promoService: PromosService) {}

  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promoService.createPromo(dto);
  }

  @Get()
  getAll() {
    return this.promoService.getAllPromos();
  }

  @Delete('id')
  delete(@Param() id: number) {
    return this.promoService.deleteOne(id);
  }
}
