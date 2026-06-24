"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid, XAxis, YAxis, Legend} from "recharts";
export default function RealtimeView() {
  const data = [
    { time: "0m", logs: 150, errors: 20 },
    { time: "1m", logs: 180, errors: 25 },
    { time: "3m", logs: 200, errors: 30 },
    { time: "5m", logs: 280, errors: 18 },
    { time: "7m", logs: 240, errors: 22 },
    { time: "8m", logs: 250, errors: 35 },
    { time: "9m", logs: 290, errors: 28 },
    { time: "10m", logs: 220, errors: 15 },
    { time: "11m", logs: 320, errors: 38 },
    { time: "12m", logs: 260, errors: 26 },
    { time: "13m", logs: 350, errors: 32 },
    { time: "14m", logs: 340, errors: 50 },
    { time: "15m", logs: 240, errors: 24 },
  ];
  return(
     <Card className="h-80 bg-primary-color text-gray-300 sm:min-h-45 lg:w-5/8">
      <CardHeader>
        <CardTitle>System Overview (Realtime Volume) </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-screen">
        <div className="h-60 w-full mt-2">
          <ResponsiveContainer width="100%" height={240} minWidth={1} minHeight={1}>
            <AreaChart data={data} >
              <defs>
                <linearGradient id="logsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="errorsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#334155"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="logs"
                name="Log Volume"
                stroke="#60a5fa"
                strokeWidth={3}
                fill="url(#logsFill)"
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                }}
              />

              <Area
                type="monotone"
                dataKey="errors"
                name="Error Volume"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#errorsFill)"
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}