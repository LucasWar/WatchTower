import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsRepository } from './logs.repository';
import { BullModule } from '@nestjs/bullmq';
import { LogsProcessor } from './logs.processor';
import { LogsGateway } from './gateway/logs.gateway';
import { JwtStrategyEnterprise } from '../enterprise/services/entrepise-auth.service';
import { MetricsService } from './services/metrics.service';
import { LogsService } from './services/logs.service';
import { EnterpriseModule } from '../enterprise/enterprise.module';
import { MetricsEmitterService } from './gateway/metrics-emitter.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'logs_queue',
    }),
    EnterpriseModule,
  ],
  controllers: [LogsController],
  providers: [
    LogsGateway,
    LogsService,
    LogsRepository,
    LogsProcessor,
    JwtStrategyEnterprise,
    MetricsService,
    MetricsEmitterService,
  ],
})
export class LogsModule {}
