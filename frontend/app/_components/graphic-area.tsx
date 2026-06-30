import { useId, useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, Tooltip} from "recharts";
import { CustomTooltip } from "./content";

interface GraphicAreaProps<T extends object> {
  data: T[];
  dataKey: string;
  colorLine?: string;
  colortArea?: string;
  height: number;
}

export default function GraphicArea<T extends object>({data, colorLine, colortArea, dataKey, height}:GraphicAreaProps<T>) {
  const gradientId = useId();
  const reversedData = useMemo(() => [...data].reverse(), [data]);


  return(
    <ResponsiveContainer width="100%" height={height} minWidth={1} minHeight={1}>
      <AreaChart data={reversedData}>
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
        
      <Tooltip content={CustomTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  )
}