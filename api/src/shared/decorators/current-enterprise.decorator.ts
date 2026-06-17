import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Socket } from 'socket.io';

interface JwtEnterprise {
  sub: string;
}

interface SocketData {
  user: JwtEnterprise;
}

type AuthenticatedSocket = Socket<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
>;

export const CurrentEnterpriseId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const client = ctx.switchToWs().getClient<AuthenticatedSocket>();

    return client.data.user.sub;
  },
);
