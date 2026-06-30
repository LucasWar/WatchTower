import { Injectable } from '@nestjs/common';
import { LogsRepository } from '../logs.repository';
import { CreateLogDto } from '../dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(private readonly logRepo: LogsRepository) {}

  create(createLogDto: CreateLogDto, enterpriseId: string) {
    return this.logRepo.create(createLogDto, enterpriseId);
  }

  findAll(enterpriseId: string) {
    return this.logRepo.findAll(enterpriseId);
  }

  async logsMin(currentEnterpriseId: string) {
    const results = await this.logRepo.findLogs(currentEnterpriseId);

    if (!results?.length) {
      return {
        current: 0,
        variation: 0,
        logs: [],
      };
    }

    const logs = results.map((result) => ({
      ...result,
      avg_duration: Number(result.total_logs.toFixed(2)),
    }));

    const current = logs[0].avg_duration;

    let variation = 0;

    // Só calcula se houver histórico para comparar
    if (logs.length > 1) {
      const historicalAverage =
        logs.slice(1).reduce((acc, log) => acc + log.avg_duration, 0) /
        (logs.length - 1);

      variation =
        historicalAverage === 0
          ? 0
          : ((current - historicalAverage) / historicalAverage) * 100;
    }

    return {
      current,
      variation: Number(variation.toFixed(2)),
      logs,
    };
  }
}
