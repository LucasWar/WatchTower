import { FilterLogDto } from "@/interfaces/logs/list-logs.interface";
import { LogsServices } from "@/services/logs";
import { useQuery } from "@tanstack/react-query";

export function useListLogs(filters: FilterLogDto) {
  return useQuery({
    queryKey: ['listLogs', filters],
    queryFn: async () => {
      return await LogsServices.ListLogs(filters)
    },
    refetchInterval: 15000,
  })
}