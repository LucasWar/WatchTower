"use client";

import { ConnectSocket } from "@/lib/socket";
import { useGetToken } from "@/services/enterprise/get-token";
import { useEffect, useState } from "react";
import { Metrics } from "./types";

export function useDashboardSocket() {
  const [token, setToken] = useState<string | null>(null);

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

  const mutation = useGetToken();

  useEffect(() => {
    mutation.mutate(undefined, {
      onSuccess: (data) => {
        setToken(data.accessToken);
      },
    });
  }, []);

  useEffect(() => {
    if (!token) return;

    const socket = ConnectSocket(token);

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.on("metrics_updated", (data) => {
      setMetrics(data)
    });

    return () => socket.disconnect();
  }, [token]);


  return {
    metrics
  }
}