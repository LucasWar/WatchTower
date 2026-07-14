import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { PayloadJwtAuth } from 'src/shared/intefaces/payload-jwt-auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: PayloadJwtAuth) {
    return user;
  }
}
