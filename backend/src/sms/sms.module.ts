import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SmsService } from './sms.service';
import { CallCodeService } from './call-code.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [],
  providers: [SmsService, CallCodeService],
  exports: [SmsService, CallCodeService],
})
export class SmsModule {}
