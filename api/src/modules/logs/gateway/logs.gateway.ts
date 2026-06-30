import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CreateLogDto } from '../dto/create-log.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { CurrentEnterpriseId } from 'src/shared/decorators/current-enterprise.decorator';
import { LogsService } from '../services/logs.service';
import { Namespace } from 'socket.io';
import { MetricsService } from '../services/metrics.service';

interface JwtEnterprise {
  sub: string;
}

@WebSocketGateway({
  namespace: '/logs',
  cors: { origin: '*' },
})
export class LogsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Namespace;

  constructor(
    private logsService: LogsService,
    private metricsService: MetricsService,
    private readonly jwtService: JwtService,
    @InjectQueue('logs_queue') private readonly logsQueue: Queue,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token as string;
    try {
      const payload: JwtEnterprise = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET_ENTERPRISE,
      });
      client.data.user = payload;
      await client.join(payload.sub);
      const logs = await this.logsService.findAll(payload.sub);
      const metrics = await this.metricsService.updateMetrics(payload.sub);

      client.emit('log_history', logs);
      client.emit('metrics_updated', metrics);
    } catch (error) {
      console.error('❌ Erro no handleConnection:', error.message);

      client.emit('error', 'Unauthorized');

      client.disconnect();
    }
  }

  @SubscribeMessage('create_log')
  @UsePipes(new ValidationPipe())
  async handleCreateLog(
    @ConnectedSocket() client: Socket,
    @CurrentEnterpriseId() enterpriseId: string,
    @MessageBody()
    createDto: CreateLogDto,
  ) {
    await this.logsQueue.add('process_log', { dto: createDto, enterpriseId });
  }

  @OnEvent('log.created')
  handleLogCreatedEvent(log: any, enterpriseId: string) {
    this.server.to(enterpriseId).emit('new_log', log);
  }
}
