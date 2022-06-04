import { Global, Module } from '@nestjs/common';
import { DadataService } from './dadata.service';
import { HttpModule } from '@nestjs/axios';

const secret = 'c421215a93d492cff23a2d1e1240b39bd50ab014';

const token = 'd017a006b611b6cbfa438ad5b4ec24e80d43bd88';

@Global()
@Module({
  controllers: [],
  providers: [DadataService],
  imports: [HttpModule],
  exports: [DadataService],
})
export class DadataModule {}
