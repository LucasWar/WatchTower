import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

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
  @IsNotEmpty()
  level!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  traceId!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsObject()
  @IsOptional()
  metadata?: Prisma.JsonValue;
}
