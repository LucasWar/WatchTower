import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { LogsRepository } from './logs.repository';
import { BullModule } from '@nestjs/bullmq';
import { LogsProcessor } from './logs.processor';
import { LogsGateway } from './logs.gateway';
import { JwtStrategyEnterprise } from '../enterprise/services/entrepise-auth.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'logs_queue',
    }),
  ],
  controllers: [LogsController],
  providers: [
    LogsGateway,
    LogsService,
    LogsRepository,
    LogsProcessor,
    JwtStrategyEnterprise,
  ],
})
export class LogsModule {}
