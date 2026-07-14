import { Controller, Post, Body, HttpCode, Req, Res } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SingInDto } from './dto/singIn.dto';
import { RegisterDto } from './dto/regsiter.dto';
import type { Response, Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setRefreshToken(response: Response, refreshToken: string) {
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
  }

  @Post('singIn')
  @HttpCode(200)
  async create(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.singIn(singInDto);

    this.setRefreshToken(response, refreshToken);

    return { accessToken };
  }

  @Post('singUp')
  singUp(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const oldRefreshToken = request.cookies['refresh_token'] as
      | string
      | undefined;

    const { accessToken, refreshToken } =
      await this.authService.refresh(oldRefreshToken);
    this.setRefreshToken(response, refreshToken);

    return { accessToken };
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'Logout realizado com sucesso' };
  }
}
