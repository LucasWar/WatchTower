import { Injectable } from '@nestjs/common';
import { LogsRepository } from '../logs.repository';
import { CreateLogDto } from '../dto/create-log.dto';
import { FilterLogDto } from '../dto/filter-log-dto';
import { BuilderFilterLogs } from '../builder-filter.service';
import { RedisService } from 'src/modules/redis/redis.service';
import { ServicesService } from 'src/modules/services/services.service';

@Injectable()
export class LogsService {
  constructor(
    private readonly logRepo: LogsRepository,
    private readonly redisService: RedisService,
    private readonly serviceLogService: ServicesService,
  ) {}

  async create(createLogDto: CreateLogDto, enterpriseId: string) {
    let serviceId = await this.redisService.getServiceId(
      enterpriseId,
      createLogDto.service,
    );

    if (serviceId == null) {
      serviceId = await this.serviceLogService.create(
        createLogDto.service,
        enterpriseId,
      );

      await this.redisService.setServiceId(
        enterpriseId,
        createLogDto.service,
        serviceId,
      );
    }

    return await this.logRepo.create(createLogDto, enterpriseId, serviceId);
  }

  async findAll(enterpriseId: string, filter: FilterLogDto) {
    const query = new BuilderFilterLogs(filter, enterpriseId).build();

    const data = await this.logRepo.findAll(query);

    const totalResults = await this.logRepo.count(query.where);

    const totalPages = Math.ceil((totalResults ?? 1) / filter.limit);

    return {
      data,
      pagination: {
        total: totalPages,
        perPage: filter.limit,
        page: filter.page,
        hasNext: filter.page < totalPages,
        hasPrev: filter.page > 1,
      },
    };
  }

  // async logsMin(currentEnterpriseId: string) {
  //   const results = await this.logRepo.findLogs(currentEnterpriseId);

  //   if (!results?.length) {
  //     return {
  //       current: 0,
  //       variation: 0,
  //       logs: [],
  //     };
  //   }

  //   const logs = results.map((result) => ({
  //     ...result,
  //     avg_duration: Number(result.total_logs.toFixed(2)),
  //   }));

  //   const current = logs[0].avg_duration;

  //   let variation = 0;

  //   // Só calcula se houver histórico para comparar
  //   if (logs.length > 1) {
  //     const historicalAverage =
  //       logs.slice(1).reduce((acc, log) => acc + log.avg_duration, 0) /
  //       (logs.length - 1);

  //     variation =
  //       historicalAverage === 0
  //         ? 0
  //         : ((current - historicalAverage) / historicalAverage) * 100;
  //   }

  //   return {
  //     current,
  //     variation: Number(variation.toFixed(2)),
  //     logs,
  //   };
  // }
}
