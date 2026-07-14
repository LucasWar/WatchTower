import { LevelLog } from "@/app/(main)/dashboard/types";
import { FilterLogDto } from "@/interfaces/logs/list-logs.interface";
import { Pagination } from "@/interfaces/pagination";
import { api } from "@/lib/api";

export interface ListLogsResponse {
    pagination: Pagination,
    data: LogData[]
}

export interface LogData {
  	id: string,
    service: string,
    module: string,
    action: string,
    level: LevelLog,
    message: string,
    traceId: string,
    externalUserId: string,
    environment: string,
    metadata: JSON,
    enterpriseId: string,
    createdAt: string;
}

export async function ListLogs(filters: FilterLogDto){
  return await api.get<ListLogsResponse | undefined>('/logs', {
    params: filters
  })
}