"use client"

import GraphicArea from "@/app/_components/graphic-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FindAvgLatencyResponse } from "../types";

interface AvgLantencyProps {
  onLatencys: FindAvgLatencyResponse[];
}

export default function AvgLantency({onLatencys}: AvgLantencyProps) {
  return(
    <Card className="max-h-45 bg-primary-color text-gray-300 sm:min-h-45">
      <CardHeader>
        <CardTitle>Avg Latency </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-screen">
        <div className="flex gap-3">
          <p className="text-3xl font-medium">{onLatencys.length == 0 ? 0 : onLatencys[0].p95_latency} ms</p>
          <div className="text-sm flex items-end justify-center">
            <span className="text-slate-500">
              stable
            </span>
          </div>
        </div>
        <div className="h-16 w-full mt-2">
          <GraphicArea 
            dataKey="p95_latency"
            data={onLatencys ?? []}
            colorLine="#3CAE63"
            colortArea="#3CAE63"
            height={64}
          />
        </div>
      </CardContent>
    </Card>
  )
}