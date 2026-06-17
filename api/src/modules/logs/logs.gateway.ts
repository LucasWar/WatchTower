import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CreateLogDto } from './dto/create-log.dto';
import { LogsService } from './logs.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { CurrentEnterpriseId } from 'src/shared/decorators/current-enterprise.decorator';

interface JwtEnterprise {
  sub: string;
}

@WebSocketGateway({
  namespace: '/logs',
  cors: { origin: '*' },
})
export class LogsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private logsService: LogsService,
    private readonly jwtService: JwtService,
    @InjectQueue('logs_queue') private readonly logsQueue: Queue,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token as string;
    console.log(token)
    try {
      const payload: JwtEnterprise = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET_ENTERPRISE,
      });

      client.data.user = payload;

      const logs = await this.logsService.findAll();
      client.emit('log_history', logs);
    } catch (error) {
      console.error('❌ Erro no handleConnection:', error.message);
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
  handleLogCreatedEvent(log: any) {
    this.server.emit('new_log', log);
  }
}
