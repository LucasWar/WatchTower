import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/singIn.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singIn')
  create(@Body() createAuthDto: SingInDto) {
    return this.authService.create(createAuthDto);
  }
}
