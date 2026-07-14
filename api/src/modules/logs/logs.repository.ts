import { PrismaService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { FindLogsForMinResponse } from './interfaces/find-logs-response';
import { ErrorRateResponse } from './interfaces/error-rate-response.interface';
import { FindAvgLatencyResponse } from './interfaces/find-avg-latency.interface';
import { FindCountLevelResponse } from './interfaces/count-level.interface';
import { CountErrorLogsTotalLogsResponse } from './interfaces/count-error-logs.interface';

@Injectable()
export class LogsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private convertRangeTimeForSql(rangeTime: string) {
    const match = rangeTime.match(
      /^(\d+)\s+(minute|minutes|hour|hours|day|days)$/,
    );

    if (!match) {
      throw new Error('Invalid range time format');
    }

    const interval = Prisma.raw(`'${match[1]} ${match[2]}'`);

    return interval;
  }

  async create(
    createDto: CreateLogDto,
    enterpriseId: string,
    serviceId: string,
  ) {
    const { service, ...dto } = createDto;
    try {
      const data: Prisma.LogsCreateInput = {
        ...dto,
        metadata: dto.metadata === null ? Prisma.JsonNull : dto.metadata,
        enterprise: {
          connect: {
            id: enterpriseId,
          },
        },
        service: {
          connect: {
            id: serviceId,
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

  async count(
    where: Prisma.LogsWhereInput | undefined,
  ): Promise<number | undefined> {
    try {
      return await this.prismaService.logs.count({
        where: {
          ...where,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(query: Prisma.LogsFindManyArgs) {
    const data = await this.prismaService.logs.findMany({
      ...query,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    const response = data.map((record) => {
      return {
        ...record,
        service: record.service.name,
      };
    });

    return response;
  }

  async findLogs(
    enterpriseId: string,
    rangeTime: string,
  ): Promise<FindLogsForMinResponse[] | undefined> {
    const interval = this.convertRangeTimeForSql(rangeTime);

    try {
      return await this.prismaService.$queryRaw`
        SELECT
          date_trunc('minute', created_at)
            - (EXTRACT(MINUTE FROM created_at)::int % 15) * INTERVAL '1 minute'
            AS bucket,

          COUNT(*) AS total_logs

        FROM logs
        WHERE created_at >= NOW() - INTERVAL ${interval}
          AND enterprise_id = ${enterpriseId}

        GROUP BY bucket
        ORDER BY bucket DESC;
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async countLogs(
    enterpriseId: string,
    rangeTime: string,
  ): Promise<CountErrorLogsTotalLogsResponse[] | undefined> {
    const interval = this.convertRangeTimeForSql(rangeTime);
    try {
      return await this.prismaService.$queryRaw`
        SELECT
          date_trunc('minute', created_at)
            - (EXTRACT(MINUTE FROM created_at)::int % 15) * INTERVAL '1 minute'
            AS bucket_time,
          COUNT(*) AS total_logs,
          COUNT(*) FILTER (WHERE level = 'ERROR') AS error_logs
        FROM logs
        WHERE created_at >= NOW() - INTERVAL ${interval}
          AND enterprise_id = ${enterpriseId}
        GROUP BY 1
        ORDER BY 1
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async findAvgLatency(
    enterpriseId: string,
    rangeTime: string,
  ): Promise<FindAvgLatencyResponse[] | undefined> {
    const interval = this.convertRangeTimeForSql(rangeTime);
    try {
      return await this.prismaService.$queryRaw`
        SELECT
          date_trunc('minute', created_at)
            - (EXTRACT(MINUTE FROM created_at)::int % 15) * INTERVAL '1 minute'
            AS bucket,

          PERCENTILE_CONT(0.95)
            WITHIN GROUP (
              ORDER BY (metadata->>'duration')::int
            ) AS p95_latency

        FROM logs

        WHERE
          created_at >= NOW() - INTERVAL ${interval}
          AND enterprise_id = ${enterpriseId}
          AND metadata ? 'duration'

        GROUP BY bucket
        ORDER BY bucket DESC
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async findCountLevel(
    enterpriseId: string,
  ): Promise<FindCountLevelResponse[] | undefined> {
    try {
      return await this.prismaService.$queryRaw`
        SELECT
        level,
        COUNT(*)
        
        FROM logs

        WHERE
          enterprise_id = ${enterpriseId}

        GROUP BY level
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async errorRate(
    enterpriseId: string,
    rangeTime: string,
  ): Promise<ErrorRateResponse[]> {
    const interval = this.convertRangeTimeForSql(rangeTime);
    return await this.prismaService.$queryRaw`
      SELECT
        date_trunc('minute', created_at)
        - (EXTRACT(MINUTE FROM created_at)::int % 15) * INTERVAL '1 minute'
        AS bucket,

        COUNT(*) AS total_logs,

        COUNT(*) FILTER (
          WHERE level = 'ERROR'
        ) AS error_logs,

        ROUND(
          (
            COUNT(*) FILTER (WHERE level = 'ERROR')::numeric
            /
            NULLIF(COUNT(*), 0)
          ) * 100,
          2
        ) AS error_rate

      FROM logs

      WHERE
        created_at >= NOW() - INTERVAL ${interval}
        AND enterprise_id = ${enterpriseId}
      GROUP BY bucket
      ORDER BY bucket DESC
    `;
  }
}
