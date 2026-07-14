"use client";

import { ConnectSocket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import { LevelLog, Metrics } from "./types";
import { ListLogsResponse } from "@/services/logs/list-logs";
import { useListLogs } from "@/hooks/listLogs";
import { FilterLogDto } from "@/interfaces/logs/list-logs.interface";
import { useLogsMetrics } from "@/hooks/useLogsMetrics";

export function useDashboardSocket() {
  //const [token, setToken] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false)
  const [logs, setLogs] = useState<ListLogsResponse | undefined>()
  const [filters, setFilters] = useState<FilterLogDto>({page: 1, limit: 5})
  //const [timeRange, setTimeRange] = useState('150 minutes')
  const { data } = useListLogs(filters)


  useEffect(() => {
    if (data) {
      setLogs(data.data)
    }
  }, [data])


  const {metrics, period, setPeriod} = useLogsMetrics('150 minutes')

  // const mutation = useGetToken();

  // useEffect(() => {
  //   mutation.mutate(undefined, {
  //     onSuccess: (data) => {
  //       setToken(data.accessToken);
  //     },
  //   });
  // }, []);

  // const {token} = useAuth()

  // const socketRef = useRef<any>(null);
  
  // useEffect(() => {
  //   if (!token) return;

  //   const socket = ConnectSocket(token);

  //   socketRef.current = socket;

  //   socket.on("connect", () => {
  //     setConnected(true);
  //     console.log("Socket conectado:", socket.id);
  //   });

  //   socket.on("disconnect", () => {
  //     setConnected(false);
  //     console.log("Socket desconectado");
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.log(err.message);
  //   });

  //   socket.on("metrics_updated", (data) => {
  //     setMetrics(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //     socketRef.current = null;
  //   };
  // }, [token]);

  // useEffect(() => {
  //   if (!socketRef.current) return;

  //   socketRef.current.emit("change_period", {
  //     period: timeRange,
  //   });

  // }, [timeRange]);


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


  return {
    metrics,
    logs,
    currentPage: filters.page,
    handleChangeCurrentPage,
    handleSetLevelLog,
    setTimeRange: setPeriod,
    connected
  }
}