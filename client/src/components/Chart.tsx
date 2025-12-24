import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EngineResponse } from "../types";

interface ChartProps {
  data?: Array<{ time: string; value: number }>;
  title?: string;
  engineResults?: Array<{
    operation: string;
    result: EngineResponse;
    timestamp: number;
  }>;
}

export function Chart({
  data,
  title = "Performance Chart",
  engineResults,
}: ChartProps) {
  // Use engine results if available, otherwise use provided data or generate sample
  let chartData: Array<{ time: string; value: number }>;

  if (engineResults && engineResults.length > 0) {
    // Convert engine results to chart data
    chartData = engineResults.map((item, i) => {
      const value =
        typeof item.result.result === "number" ? item.result.result : 0;
      return {
        time: `${i * 5}min`,
        value: value,
      };
    });
    // Pad with sample data if needed to reach minimum 20 points
    if (chartData.length < 20) {
      const additional = Array.from(
        { length: 20 - chartData.length },
        (_, i) => ({
          time: `${(chartData.length + i) * 5}min`,
          value: Math.random() * 100,
        })
      );
      chartData = [...chartData, ...additional];
    }
  } else if (data) {
    chartData = data;
  } else {
    // Generate sample data if none provided
    chartData = Array.from({ length: 20 }, (_, i) => ({
      time: `${i * 5}min`,
      value: Math.random() * 100,
    }));
  }

  return (
    <Card
      variant="dark"
      className="h-full w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl flex flex-col min-h-0 overflow-hidden relative"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-lg pointer-events-none" />

      <CardHeader className="flex-shrink-0 relative z-10">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#475569"
              opacity={0.4}
            />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#60a5fa"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
