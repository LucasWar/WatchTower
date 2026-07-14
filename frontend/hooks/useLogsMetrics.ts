import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import { Metrics } from "@/app/(main)/dashboard/types";

export function useLogsMetrics(initialPeriod: string) {
  const socket = useSocket();
  const [metrics, setMetrics] = useState<Metrics>({
    logsForMin: {
      current: 0,
      variation: 0,
      logs: []
    },
    errorRate: {
      chart: [],
      summary: {
        current: 0,
        variationPercent: 0,
        variationPoints: 0,
      }
    },
    latency: [],
    countLevel: [],
    totalLogsAndErro: [],
  });
  const [period, setPeriod] = useState(initialPeriod);

  // recebendo dados
  useEffect(() => {
    const handleMetrics = (data: Metrics) => setMetrics(data);
    socket.on("metrics_updated", handleMetrics);
    return () => {
      socket.off("metrics_updated", handleMetrics);
    };
  }, [socket]);

  // enviando ação quando period muda
  useEffect(() => {
    if (!socket.connected) return;
    socket.emit("change_period", { period });
  }, [socket, period]);

  return { metrics, period, setPeriod };
}