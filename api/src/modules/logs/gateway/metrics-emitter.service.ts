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
      const rooms = this.logsGateway.server.adapter.rooms;
      const sids = this.logsGateway.server.adapter.sids;

      for (const roomId of rooms.keys()) {
        if (sids.has(roomId)) {
          continue;
        }

        console.log('Enterprise:', roomId);

        const metrics = await this.metricsService.updateMetrics(roomId);

        this.logsGateway.server.to(roomId).emit('metrics_updated', metrics);
      }
    } catch (error) {
      console.log(`Erro emmiter metrics: ${error}`);
    }
  }
}
