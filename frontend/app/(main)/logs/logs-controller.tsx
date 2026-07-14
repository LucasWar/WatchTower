'use client'

import { useListLogs } from "@/hooks/listLogs";
import { FilterLogDto } from "@/interfaces/logs/list-logs.interface";
import { LogData, ListLogsResponse } from "@/services/logs/list-logs";
import { useEffect, useState } from "react";
import { LevelLog } from "../dashboard/types";

export function useLogsController() {
  const [filters, setFilters] = useState<FilterLogDto>({page: 1, limit: 15})
  const [logs, setLogs] = useState<ListLogsResponse | undefined>()
  const [selectedLog, setSelectedLog] = useState<LogData | null>()
  
  const { data } = useListLogs(filters)

  useEffect(() => {
    if (data) {
      setLogs(data.data)
    }
  }, [data])

  function handleSetLevelLog(level: LevelLog){
      setFilters((prev) => ({
        ...prev,
        level,
      }));
    }
  
    function handleChangeCurrentPage(page: number) {
      setFilters((prev) => ({
        ...prev,
        page,
      }));
    }

    function handleSelectLog(log: LogData | null) {
      setSelectedLog(log)
    }


  return {
    logs,
    filters,
    selectedLog,
    handleSetLevelLog,
    handleChangeCurrentPage,
    handleSelectLog
  }
}