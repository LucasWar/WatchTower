import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { LogLevel, Prisma } from '@prisma/client';

// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json }
//   | Json[];

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  service!: string;

  @IsString()
  @IsNotEmpty()
  module!: string;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsString()
  @IsEnum(LogLevel)
  level!: LogLevel;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  traceId!: string;

  @IsString()
  @IsNotEmpty()
  externalUserId!: string;

  @IsObject()
  @IsOptional()
  metadata?: Prisma.JsonValue;
}
