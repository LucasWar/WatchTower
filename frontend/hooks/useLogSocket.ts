import { getSocket } from "@/config/socket";
import { useEffect } from "react";

export function useLogsSocket(onMetrics: (data: any) => void, onNewLog: (log: any) => void) {
  useEffect(() => {
    const socket = getSocket();

    socket.on("metrics_updated", onMetrics);
    socket.on("new_log", onNewLog);

    return () => {
      socket.off("metrics_updated", onMetrics);
      socket.off("new_log", onNewLog);
    };
  }, [onMetrics, onNewLog]);
}