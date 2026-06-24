import { useId } from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip} from "recharts";

interface GraphicAreaProps {
  data: Record<string, number | string>[];
  dataKey: string;
  colorLine?: string;
  colortArea?: string;
  height: number;
}

export default function GraphicArea({data, colorLine, colortArea, dataKey, height}:GraphicAreaProps) {
   const gradientId = useId();
  return(
    <ResponsiveContainer width="100%" height={height} minWidth={1} minHeight={1}>
      <AreaChart data={data}>
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={colorLine ?? "#fff"}
              stopOpacity={0.4}
            />
            <stop
              offset="100%"
              stopColor={colorLine ?? "#fff"}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={colortArea ?? "#fff"}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
        />
        <Tooltip/>
      </AreaChart>
    </ResponsiveContainer>
  )
}