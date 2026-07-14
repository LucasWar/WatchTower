import { Injectable } from '@nestjs/common';
import { LogsGateway } from './logs.gateway';
import { Interval } from '@nestjs/schedule';
import { EnterpriseService } from 'src/modules/enterprise/services/enterprise.service';
import { MetricsService } from '../services/metrics.service';

@Injectable()
export class MetricsEmitterService {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly enterpriseService: EnterpriseService,
    private readonly logsGateway: LogsGateway,
  ) {}

  @Interval(15000)
  async updateMetrics() {
    try {
      const sockets = this.logsGateway.server.sockets;

      for (const socket of sockets.values()) {
        const enterpriseId = socket.data.user?.enterpriseId;

        if (!enterpriseId) continue;

        const period = socket.data.period ?? '150 minutes';

        const metrics = await this.metricsService.updateMetrics(
          enterpriseId,
          period,
        );

        socket.emit('metrics_updated', metrics);
      }
    } catch (error) {
      console.log(`Erro emitter metrics: ${error}`);
    }
  }
}
