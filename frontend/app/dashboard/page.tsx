"use client";

import AvgLantency from "./_components/avg-latency";
import ErrorRate from "./_components/error-rate";
import LargeMin from "./_components/large-min-component";
import RealtimeView from "./_components/realtime-view";
import TopFiveServices from "./_components/top-five-services";
import TriggredAlert from "./_components/trigged-alerts";
import { useDashboardSocket } from "./dashboard-controller";

export default function Dashboard() {
  const {metrics} = useDashboardSocket();
  console.log(metrics.totalLogsAndErro)
  return (
    <div className="flex flex-col min-h-screen mx-5 mt-10 gap-7">
      <span className="mb-5 text-3xl font-medium text-white">Dashboard overview</span>
      <div className="grid grid-cols-1 gap-5 w-full lg:grid-cols-2 xl:grid-cols-4">
        <LargeMin 
          onLogs={metrics.logsForMin}
        />
        <ErrorRate 
          onRate={metrics.errorRate}
        />
        <AvgLantency 
          onLatencys={metrics.latency}
        />
        <TriggredAlert />
      </div>
      <div className="flex flex-col gap-5 lg:flex-row">
        <RealtimeView 
          onTotalLogsAndErro = {metrics.totalLogsAndErro}
        />
        <TopFiveServices 
          onLevelRecords={metrics.countLevel}
        />
      </div>
    </div>
  )
}