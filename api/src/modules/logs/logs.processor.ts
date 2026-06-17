import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor('logs_queue')
export class LogsProcessor extends WorkerHost {
  constructor(
    private readonly logService: LogsService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }

  async process(
    job: Job<{ dto: CreateLogDto; enterpriseId: string }, any, string>,
  ): Promise<any> {
    switch (job.name) {
      case 'process_log': {
        const logData = job.data.dto;

        const savedLog = await this.logService.create(
          logData,
          job.data.enterpriseId,
        );

        this.eventEmitter.emit('log.created', savedLog);

        break;
      }
    }
  }
}
