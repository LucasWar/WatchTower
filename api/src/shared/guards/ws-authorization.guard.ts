import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Extrai o cliente (Socket) do contexto
    const client: Socket = context.switchToWs().getClient<Socket>();

    // 2. Busca o token. O Insomnia e o front-end geralmente mandam de duas formas:
    // Via headers de handshake ou via objeto de autenticação
    const authHeader = client.handshake.headers.authorization;

    const authPayloadToken = client.handshake.auth?.token as string | undefined;

    const token = (authHeader && authHeader.split(' ')[1]) || authPayloadToken;

    if (!token) {
      throw new WsException('Token não fornecido.');
    }

    try {
      // 3. Valide o token (Exemplo fictício com JwtService)
      const payload = await this.jwtService.verifyAsync(token);

      // 4. Anexe os dados do usuário ao socket para usar dentro do Gateway!
      client.data.user = payload;

      return true;
    } catch (err) {
      throw new WsException('Token inválido ou expirado.');
    }
  }
}