import { PrismaService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: CreateLogDto) {
    const { clientId, ...dto } = createDto;
    const data: Prisma.LogsCreateInput = {
      ...dto,
      metadata: dto.metadata === null ? Prisma.JsonNull : dto.metadata,
      client: {
        connect: {
          id: clientId,
        },
      },
    };

    return await this.prismaService.logs.create({
      data,
    });
  }

  async findAll() {
    return await this.prismaService.logs.findMany();
  }
}
