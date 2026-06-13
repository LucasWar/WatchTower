import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { LogsRepository } from './logs.repository';
import { PrismaService } from 'src/database/database.service';
import { BullModule } from '@nestjs/bullmq';
import { LogsProcessor } from './logs.processor';
import { LogsGateway } from './logs.gateway';

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
    PrismaService,
    LogsProcessor,
  ],
})
export class LogsModule {}
