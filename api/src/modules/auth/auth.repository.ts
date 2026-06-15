import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneByEmail(email: string) {
    return await this.prismaService.clients.findUnique({
      where: {
        email,
      },
    });
  }

  async register(email: string, hashPassword: string) {
    return await this.prismaService.clients.create({
      data: {
        email,
        password: hashPassword,
      },
    });
  }

  async verificRefreshToken(jti: string) {
    return await this.prismaService.refreshToken.findFirst({
      where: {
        jti,
      },
    });
  }

  async createRefreshToken(jti: string, clientId: string) {
    return await this.prismaService.refreshToken.create({
      data: {
        clientId,
        jti,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async updateRefreshToken(oldJti: string, newJti: string) {
    return await this.prismaService.refreshToken.update({
      where: {
        jti: oldJti,
      },
      data: {
        jti: newJti,
      },
    });
  }

  async findClientById(id: string) {
    return await this.prismaService.clients.findUnique({
      where: {
        id,
      },
    });
  }
}
