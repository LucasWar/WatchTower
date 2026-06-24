"use client"
import GraphicArea from "@/app/_components/graphic-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogHistoryForMinute } from "../types";


const data = [
  { value: 20 },
  { value: 18 },
  { value: 15 },
  { value: 22 },
  { value: 30 },
  { value: 25 },
  { value: 18 },
  { value: 35 },
  { value: 40 },
  { value: 28 },
  { value: 32 },
  { value: 36 },
];

interface LargeMinProps {
  onLogs: LogHistoryForMinute;
}

export default function LargeMin({onLogs}:LargeMinProps) {
  return(
    <Card className="max-h-45 bg-primary-color text-gray-300 sm:min-h-45">
      <CardHeader>
        <CardTitle>Logs/min </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <p className="text-3xl font-medium">{Math.trunc(onLogs.current)}</p>
          <div className="text-sm text-green-400 mb-1">
            {onLogs.variation}
            <br />
            <span className="text-slate-500">
              vs previous period
            </span>
          </div>
        </div>
        <div className="h-16">
          <GraphicArea 
            data={onLogs.logs}
            dataKey="avg_duration"
            height={64}
          />
        </div>
      </CardContent>
    </Card>
  )
}