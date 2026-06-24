"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function TopFiveServices() {

  const data = [
    { service: "erp-api", value: 180 },
    { service: "auth-worker", value: 100 },
    { service: "payments", value: 70 },
    { service: "core-db", value: 35 },
    { service: "notifier", value: 15 },
  ];

  return(
    <Card className="max-h-80 bg-primary-color text-gray-300 sm:min-h-45 lg:w-3/8">
      <CardHeader>
        <CardTitle>Triggered Alerts </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center h-full text-4xl text-scarlet/70">
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 0,
              right: 30,
              left: 20,
              bottom: 0,
            }}

          >
            <CartesianGrid
              strokeDasharray="0"
              horizontal={false}
              stroke="#243244"
            />

            <XAxis
              type="number"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="service"
              tick={{ fill: "#e2e8f0", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={90}
            />

            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              barSize={10}
              fill="#7fb0e6"
            >
              {/* {data.map((_, index) => (
                <Cell key={index} fill="#7fb0e6" />
              ))} */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}