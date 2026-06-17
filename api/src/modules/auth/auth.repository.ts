import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneByEmail(email: string) {
    return await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });
  }

  async register(email: string, hashPassword: string, enterpriseId: string) {
    return await this.prismaService.users.create({
      data: {
        email,
        password: hashPassword,
        enterpriseId,
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

  async createRefreshToken(jti: string, userId: string) {
    return await this.prismaService.refreshToken.create({
      data: {
        userId,
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

  async findUserById(id: string) {
    return await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
  }
}
