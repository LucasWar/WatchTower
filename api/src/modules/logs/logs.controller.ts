import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { JwtEnterpriseGuard } from '../enterprise/jwt-enterprise.guard';
import { LogsService } from './services/logs.service';
import { FilterLogDto } from './dto/filter-log-dto';
import { CurrentEnterpriseHttp } from 'src/shared/decorators/current-enterprise-http.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('logs')
export class LogsController {
  constructor(
    @InjectQueue('logs_queue') private logsQueue: Queue,
    private readonly logsService: LogsService,
  ) {}

  @Post()
  @HttpCode(202)
  @UseGuards(JwtEnterpriseGuard)
  async create(
    @Body() createLog: CreateLogDto,
    @CurrentEnterpriseHttp() enterpriseId: string,
  ) {
    await this.logsQueue.add('process_log', {
      dto: {
        ...createLog,
      },
      enterpriseId,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listLogs(
    @Query() filters: FilterLogDto,
    @CurrentEnterpriseHttp() enterpriseId: string,
  ) {
    return await this.logsService.findAll(enterpriseId, filters);
  }
}
