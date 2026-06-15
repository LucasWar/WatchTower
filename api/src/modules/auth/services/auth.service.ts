import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SingInDto } from '../dto/singIn.dto';
import { AuthRepository } from '../auth.repository';
import { RegisterDto } from '../dto/regsiter.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

interface RefreskTokenPayload {
  sub: string;
  jti: string;
}

interface AccessTokenPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async generateTokens(userId: string, email: string) {
    const jti = randomUUID();
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15min',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, jti },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken, jti };
  }

  async singIn(singInDto: SingInDto) {
    const { email, password } = singInDto;

    const client = await this.authRepo.findOneByEmail(email);

    if (!client) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isValid = await bcrypt.compare(password, client.password);

    if (!isValid) {
      throw new ConflictException('Senha incorreta');
    }

    const { accessToken, refreshToken, jti } = await this.generateTokens(
      client.id,
      email,
    );

    await this.authRepo.createRefreshToken(jti, client.id);

    return { accessToken, refreshToken };
  }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const ownerEmail = await this.authRepo.findOneByEmail(email);

    if (ownerEmail) {
      throw new ConflictException('Email já registrado');
    }

    const hashPassword = await bcrypt.hash(password, 7);

    const newClient = await this.authRepo.register(email, hashPassword);

    return newClient;
  }

  async refresh(token: string | undefined) {
    if (!token) {
      throw new BadRequestException('Refresh token não enviado');
    }

    const validRefreshToken =
      await this.jwtService.verifyAsync<RefreskTokenPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

    if (!validRefreshToken) {
      throw new UnauthorizedException('Refresh token invalido');
    }

    const session = await this.authRepo.verificRefreshToken(validRefreshToken.jti)

    if (!session) {
      throw new UnauthorizedException('Seção invalida');
    }

    if (session.expiresAt.getTime() === new Date(Date.now()).getTime()) {
      throw new UnauthorizedException('Seção expirou');
    }

    if (session.revokedAt) {
      throw new UnauthorizedException('Seção foi encerrada');
    }

    const client = await this.authRepo.findClientById(session.clientId);

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const {
      accessToken,
      jti: newJti,
      refreshToken,
    } = await this.generateTokens(client.id, client.email);

    await this.authRepo.updateRefreshToken(validRefreshToken.jti, newJti);

    return { accessToken, refreshToken };
  }
}
