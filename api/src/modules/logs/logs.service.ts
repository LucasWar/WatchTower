import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { LogsRepository } from './logs.repository';

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
    const results = await this.logRepo.findLogsForMin(currentEnterpriseId);

    if (!results?.length) {
      return {
        current: 0,
        variation: 0,
        logs: [],
      };
    }

    const logs = results.map((result) => ({
      ...result,
      avg_duration: Number(result.avg_duration),
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
