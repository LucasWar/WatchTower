import { PrismaService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: CreateLogDto) {
    const data: Prisma.logsCreateInput = {
      ...createDto,
      metadata:
        createDto.metadata === null ? Prisma.JsonNull : createDto.metadata,
    };

    return await this.prismaService.logs.create({
      data,
    });
  }

  async findAll() {
    return await this.prismaService.logs.findMany();
  }
}
