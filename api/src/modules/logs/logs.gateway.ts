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

@WebSocketGateway({
  namespace: '/logs',
  cors: { origin: '*' },
})
export class LogsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private logsService: LogsService,
    @InjectQueue('logs_queue') private readonly logsQueue: Queue,
  ) {}

  async handleConnection(client: Socket) {
    try {
      console.log('✅ Cliente conectou:', client.id);
      const logs = await this.logsService.findAll();
      client.emit('log_history', logs);
    } catch (error) {
      console.error('❌ Erro no handleConnection:', error.message);
    }
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('create_log')
  async handleCreateLog(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: CreateLogDto,
  ) {
    await this.logsQueue.add('process_log', dto);
  }

  @OnEvent('log.created')
  handleLogCreatedEvent(log: any) {
    this.server.emit('new_log', log);
  }
}
