import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export class WsValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new WsException(
          errors.map(error => ({
            field: error.property,
            errors: Object.values(error.constraints ?? {}),
          })),
        );
      },
    });
  }
}