import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JwtEnterpriseGuard } from '../enterprise/jwt-enterprise.guard';
import { MetricsService } from './services/metrics.service';
import { LogsService } from './services/logs.service';

@Controller('logs')
export class LogsController {
  constructor(
    @InjectQueue('logs_queue') private logsQueue: Queue,
    private readonly logsService: LogsService,
    private readonly metricsService: MetricsService,
  ) {}

  @Post()
  @HttpCode(202)
  @UseGuards(JwtEnterpriseGuard)
  async create(@Body() createLog: CreateLogDto) {
    await this.logsQueue.add('process_log', createLog);
  }

  // @Post('testeMetrics')
  // @HttpCode(202)
  // async teste() {
  //   return await this.metricsService.updateMetrics();
  // }
}
