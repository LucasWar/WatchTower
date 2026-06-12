import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';

@Processor('logs_queue')
export class LogsProcessor extends WorkerHost {
  constructor(private readonly logService: LogsService) {
    super();
  }

  async process(job: Job<CreateLogDto, any, string>): Promise<any> {
    switch (job.name) {
      case 'process_log': {
        const logData = job.data;
        await this.logService.create(logData);

        break;
      }
    }
  }
}
