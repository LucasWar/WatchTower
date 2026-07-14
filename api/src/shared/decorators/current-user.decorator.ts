import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadJwtAuth } from '../intefaces/payload-jwt-auth';

export const CurrentUser = createParamDecorator<any, PayloadJwtAuth>(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as PayloadJwtAuth;
  },
);
