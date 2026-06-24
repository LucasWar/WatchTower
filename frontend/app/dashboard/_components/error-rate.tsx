"use client"
import GraphicArea from "@/app/_components/graphic-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useId } from "react";

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

export default function ErrorRate() {
  return(
    <Card className="max-h-45 bg-primary-color text-red-400/60 sm:min-h-45">
      <CardHeader className="text-gray-300">
        <CardTitle>Error Rate </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <p className="text-3xl font-medium">1.8%</p>
          <div className="text-sm text-green-400 mb-1">
            -0.2%
            <br />
            <span className="text-slate-500">
              vs previous period
            </span>
          </div>
        </div>
        <div className="h-16 w-full mt-2">
          <GraphicArea 
            data={data}
            dataKey="value"
            colorLine="#C91B00"
            colortArea="#C91B00"
            height={64}
          />
        </div>
      </CardContent>
    </Card>
  )
}