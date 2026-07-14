import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceRepository } from './services.repository';

@Module({
  providers: [ServicesService, ServiceRepository],
  exports: [ServicesService],
})
export class ServicesModule {}
