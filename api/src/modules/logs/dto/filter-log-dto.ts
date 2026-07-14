import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LogLevel } from '../enum/log-level.enum';

export class FilterLogDto {
  @IsNotEmpty()
  @IsString()
  page!: number;

  @IsNotEmpty()
  @IsString()
  limit!: number;

  @IsOptional()
  @IsString()
  sort?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsString()
  @IsOptional()
  service?: string;

  @IsString()
  @IsOptional()
  module?: string;

  @IsEnum(LogLevel)
  @IsOptional()
  level?: LogLevel;

  @IsString()
  @IsOptional()
  environment?: string;
}
