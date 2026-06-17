import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JwtEnterpriseGuard } from '../enterprise/jwt-enterprise.guard';

@Controller('logs')
export class LogsController {
  constructor(@InjectQueue('logs_queue') private logsQueue: Queue) {}

  @Post()
  @HttpCode(202)
  @UseGuards(JwtEnterpriseGuard)
  async create(@Body() createLog: CreateLogDto) {
    await this.logsQueue.add('process_log', createLog);
  }
}
