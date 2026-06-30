import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class EnterpriseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findEnterpriseByCnpj(cnpj: string) {
    try {
      return await this.prismaService.enterprises.findUnique({
        where: {
          cnpj,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findMany() {
    try {
      return await this.prismaService.enterprises.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findEnterpriseByApiId(apiId: string) {
    try {
      return await this.prismaService.enterprises.findUnique({
        where: {
          apiId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(name: string, cnpj: string, apiKey: string, apiId: string) {
    try {
      return await this.prismaService.enterprises.create({
        data: {
          name,
          cnpj,
          apiKey,
          apiId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
