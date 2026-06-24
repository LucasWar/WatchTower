"use client";

import { ConnectSocket } from "@/lib/socket";
import { useGetToken } from "@/services/enterprise/get-token";
import { useEffect, useState } from "react";
import { LogHistoryForMinute } from "./types";

export function useDashboardSocket() {
  const [token, setToken] = useState<string | null>(null);

  const [logsForMinute, setLogsForMinute] = useState<LogHistoryForMinute>();

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

    //socket.on("log_history", console.log);
    socket.on("log_for_minute_history", (data) => {
      setLogsForMinute(data)
    });
    //socket.on("new_log", console.log);


    return () => socket.disconnect();
  }, [token]);


  return {
    logsForMinute
  }
}