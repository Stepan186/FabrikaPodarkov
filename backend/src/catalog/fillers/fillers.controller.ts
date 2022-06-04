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
import { FillersService } from './fillers.service';
import { CreateFillerDto } from './dto/create-filler.dto';
import { UpdateFillerDto } from './dto/update-filler.dto';

@Controller('fillers')
export class FillersController {
  constructor(private fillersService: FillersService) {}

  @Post()
  create(@Body() dto: CreateFillerDto) {
    return this.fillersService.createFiller(dto);
  }

  @Get()
  getAll() {
    return this.fillersService.getFillers();
  }

  @Get(':fillerId')
  getOne(@Param() fillerId: number) {
    return this.fillersService.getFiller(fillerId);
  }

  @Patch(':fillerId')
  update(@Param() fillerId: number, @Body() dto: UpdateFillerDto) {
    return this.fillersService.updateFiller(fillerId, dto);
  }

  @Delete(':fillerId')
  delete(@Param() fillerId: number) {
    return this.fillersService.deleteOne(fillerId);
  }
}
