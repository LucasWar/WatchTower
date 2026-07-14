import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<Socket>();

    const token = client.handshake.auth.token;

    if (!token) {
      console.log('token invalido');
    }

    console.log(token);

    return true;
  }
}