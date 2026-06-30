import { Injectable } from '@nestjs/common';
import { LogsRepository } from '../logs.repository';

@Injectable()
export class MetricsService {
  constructor(private readonly logRepo: LogsRepository) {}

  async updateMetrics(enterpriseId: string) {
    const logsForMin = await this.logsMin(enterpriseId);
    const errorRate = await this.errorRate(enterpriseId);
    const latency = await this.latency(enterpriseId);
    const countLevel = await this.countLevelRecords(enterpriseId);
    const totalLogsAndErro = await this.overviewLogs(enterpriseId);

    return {
      logsForMin,
      errorRate,
      latency,
      countLevel,
      totalLogsAndErro,
    };
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

    const current = Number(results[0].total_logs);

    let variation = 0;

    if (results.length > 1) {
      const historicalAverage =
        results.slice(1).reduce((acc, log) => acc + Number(log.total_logs), 0) /
        (results.length - 1);

      variation =
        historicalAverage === 0
          ? 0
          : ((current - historicalAverage) / historicalAverage) * 100;
    }

    const logs = results.map((result) => {
      return {
        ...result,
        total_logs: Number(result.total_logs),
      };
    });

    return {
      current,
      variation: Number(variation.toFixed(2)),
      logs: logs,
    };
  }

  async errorRate(currentEnterpriseId: string) {
    const results = await this.logRepo.errorRate(currentEnterpriseId);

    if (!results?.length) {
      return {
        chart: [],
        summary: {
          current: 0,
          variationPercent: 0,
          variationPoints: 0,
        },
      };
    }

    const errors = results.map((result) => ({
      ...result,
      error_rate: Number(result.error_rate),
      total_logs: Number(result.total_logs),
      error_logs: Number(result.error_logs),
    }));

    const current = errors[0].error_rate;

    let variation = 0;
    let historicalAverage = 0;
    if (errors.length > 1) {
      historicalAverage =
        errors.slice(1).reduce((acc, error) => acc + error.error_rate, 0) /
        (errors.length - 1);

      variation =
        historicalAverage === 0
          ? 0
          : ((current - historicalAverage) / historicalAverage) * 100;
    }

    return {
      summary: {
        current: Number(current.toFixed(2)),
        variationPercent: Number(variation.toFixed(2)),
        variationPoints: Number((current - historicalAverage).toFixed(2)),
      },
      chart: errors,
    };
  }

  async latency(currentEnterpriseId: string) {
    const results = await this.logRepo.findAvgLatency(currentEnterpriseId);

    if (!results?.length) {
      return [];
    }

    const latencys = results.map((result) => ({
      ...result,
      p95_latency: Number(result.p95_latency.toFixed(2)),
    }));

    return latencys;
  }

  async countLevelRecords(enterpriseId: string) {
    const results = await this.logRepo.findCountLevel(enterpriseId);

    if (!results?.length) {
      return [];
    }

    const countLevel = results.map((result) => ({
      ...result,
      count: Number(result.count),
    }));

    return countLevel;
  }

  async overviewLogs(enterpriseId: string) {
    const results = await this.logRepo.countLogs(enterpriseId);

    if (!results?.length) {
      return [];
    }

    const totalLogsAndErro = results.map((result) => ({
      ...result,
      total_logs: Number(result.total_logs),
      error_logs: Number(result.error_logs),
    }));

    return totalLogsAndErro;
  }
}
