import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Upload } from './entities/uploud.entity';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Upload])],
  exports: [],
  providers: [UploadsService],
  controllers: [UploadsController],
})
export class UploadsModule {}
