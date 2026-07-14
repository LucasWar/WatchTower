import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class ServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(name: string, enterpriseId: string) {
    try {
      return await this.prismaService.services.create({
        data: {
          name,
          enterpriseId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOneByName(name: string, enterpriseId: string) {
    await this.prismaService.services.findUnique({
      where: {
        enterpriseId_name: {
          name,
          enterpriseId,
        },
      },
    });
  }

  async findAll(enterpriseId: string) {
    return await this.prismaService.services.findMany({
      where: {
        enterpriseId,
      },
    });
  }
}
