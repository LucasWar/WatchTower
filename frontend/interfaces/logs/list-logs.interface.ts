import { LevelLog } from "@/app/(main)/dashboard/types";

export interface FilterLogDto {
  page: number;

  limit: number;

  sort?: 'asc' | 'desc';

  sortBy?: string;

  service?: string;
  
  module?: string;

  level?: LevelLog;

  environment?: string;
}
