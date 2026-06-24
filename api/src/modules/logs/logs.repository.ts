import { PrismaService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { FindLogsForMinResponse } from './interfaces/find-logs-response';

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

  async findAll(enterpriseId: string) {
    return await this.prismaService.logs.findMany({
      where: {
        id: enterpriseId,
      },
    });
  }

  async findLogsForMin(
    enterpriseId: string,
  ): Promise<FindLogsForMinResponse[] | undefined> {
    try {
      return await this.prismaService.$queryRaw`
        SELECT 
          date_trunc('minute', created_at)
            - (EXTRACT(MINUTE FROM created_at)::int % 5) * INTERVAL '1 minute'
            AS bucket,

          AVG((metadata->>'duration')::int) AS avg_duration

        FROM logs
        WHERE created_at >= NOW() - INTERVAL '150 minutes'
          AND metadata ? 'duration'
          AND enterprise_id = ${enterpriseId}
        GROUP BY bucket
        ORDER BY bucket DESC
        LIMIT 10;
      `;
    } catch (error) {
      console.log(error);
    }
  }
}
