import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUploadDto } from './dto/update-upload.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
)
@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.create(file);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.uploadsService.findOne(id);
  }

  @Patch(':id')
  update(@Body() dto: UpdateUploadDto) {
    return this.uploadsService.update(dto.id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.uploadsService.remove(id);
  }
}
