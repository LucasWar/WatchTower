import { Prisma } from '@prisma/client';
import { FilterLogDto } from './dto/filter-log-dto';

export class BuilderFilterLogs {
  constructor(
    private readonly filters: FilterLogDto,
    private enterpriseId: string,
  ) {}

  private where: Prisma.LogsWhereInput = {};
  private skip?: number;
  private take?: number;
  private orderBy?: Prisma.LogsOrderByWithRelationInput;

  public build(): Prisma.LogsFindManyArgs {
    this.withPagination();
    this.withEnvironment();
    this.withModule();
    this.withService();
    this.withLevel();

    this.where.enterpriseId = {
      equals: this.enterpriseId,
    };

    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      orderBy: this.orderBy,
    };
  }

  private withPagination(): this {
    if (this.filters.page && this.filters.limit) {
      const page = Number(this.filters.page);
      const limit = Number(this.filters.limit);

      this.skip = (page - 1) * limit;
      this.take = limit;
    }

    return this;
  }

  private withService(): this {
    if (this.filters.service) {
      this.where.service ??= {};
      this.where.service.name = {
        contains: this.filters.service,
        mode: 'insensitive',
      };
    }

    return this;
  }

  private withLevel(): this {
    if (this.filters.level) {
      this.where.level = {
        equals: this.filters.level,
      };
    }

    return this;
  }

  private withModule(): this {
    if (this.filters.module) {
      this.where.module = {
        contains: this.filters.module,
        mode: 'insensitive',
      };
    }

    return this;
  }

  private withEnvironment(): this {
    if (this.filters.environment) {
      this.where.environment = {
        contains: this.filters.environment,
        mode: 'insensitive',
      };
    }

    return this;
  }
}
