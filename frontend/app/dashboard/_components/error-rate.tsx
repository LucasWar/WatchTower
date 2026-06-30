"use client"
import GraphicArea from "@/app/_components/graphic-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useId } from "react";
import { ErrorRateInterface } from "../types";

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

interface ErrorRateProps {
  onRate: ErrorRateInterface
}

export default function ErrorRate({onRate}: ErrorRateProps) {
  return(
    <Card className="max-h-45 bg-primary-color text-red-400/60 sm:min-h-45">
      <CardHeader className="text-gray-300">
        <CardTitle>Error Rate </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <p className="text-3xl font-medium">{onRate.summary.current}%</p>
          <div className="text-sm text-green-400 mb-1">
            {onRate.summary.variationPercent}%
            <br />
            <span className="text-slate-500">
              vs previous period
            </span>
          </div>
        </div>
        <div className="h-16 w-full mt-2">
          <GraphicArea 
            data={onRate.chart}
            dataKey="error_rate"
            colorLine="#C91B00"
            colortArea="#C91B00"
            height={64}
          />
        </div>
      </CardContent>
    </Card>
  )
}