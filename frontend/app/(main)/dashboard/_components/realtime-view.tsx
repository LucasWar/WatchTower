"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid, XAxis, YAxis, Legend} from "recharts";
import { CountErrorLogsTotalLogsResponse } from "../types";
import { utcToUserHour } from "@/lib/utcToUserHour";

interface RealtimeViewProps {
  onTotalLogsAndErro: CountErrorLogsTotalLogsResponse[]
}

export default function RealtimeView({onTotalLogsAndErro}: RealtimeViewProps) {
  let data;
  console.log(onTotalLogsAndErro)
  if(onTotalLogsAndErro){
    data = onTotalLogsAndErro.map((data) => {
      return {
        ...data,
        bucket_time: utcToUserHour(data.bucket_time)
      }
    })
  }
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
                dataKey="bucket_time"
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
                dataKey="total_logs"
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
                dataKey="error_logs"
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