import { PrismaService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: CreateLogDto, enterpriseId: string) {
    try {
      const data: Prisma.LogsCreateInput = {
        ...createDto,
        metadata:
          createDto.metadata === null ? Prisma.JsonNull : createDto.metadata,
        enterprise: {
          connect: {
            id: enterpriseId,
          },
        },
      };

      return await this.prismaService.logs.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.prismaService.logs.findMany();
  }
}
