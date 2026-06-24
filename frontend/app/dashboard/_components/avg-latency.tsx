"use client"

import GraphicArea from "@/app/_components/graphic-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { value: 10 },
  { value: 10 },
  { value: 9 },
  { value: 12 },
  { value: 20 },
  { value: 6 },
  { value: 60 },
  { value: 35 },
  { value: 40 },
  { value: 28 },
  { value: 32 },
  { value: 36 },
];

export default function AvgLantency() {
  return(
    <Card className="max-h-45 bg-primary-color text-gray-300 sm:min-h-45">
      <CardHeader>
        <CardTitle>Avg Latency </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-screen">
        <div className="flex gap-3">
          <p className="text-3xl font-medium">112ms</p>
          <div className="text-sm flex items-end justify-center">
            <span className="text-slate-500">
              stable
            </span>
          </div>
        </div>
        <div className="h-16 w-full mt-2">
          <GraphicArea 
            dataKey="value"
            data={data}
            colorLine="#3CAE63"
            colortArea="#3CAE63"
            height={64}
          />
        </div>
      </CardContent>
    </Card>
  )
}