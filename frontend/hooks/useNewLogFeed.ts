import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useNewLogsFeed() {
  const socket = useSocket();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const handleNewLog = (log: any) => setLogs((prev) => [log, ...prev]);
    socket.on("new_log", handleNewLog);
    return () => {
      socket.off("new_log", handleNewLog);
    };
  }, [socket]);

  return logs;
}