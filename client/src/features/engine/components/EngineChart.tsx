"use client";

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
import { useMemo } from "react";
import { EngineCalculationResponse } from "../types/engineTypes";

interface ChartProps {
  data?: Array<{ time: string; value: number }>;
  title?: string;
  calculations?: EngineCalculationResponse[];
}

export function Chart({
  data,
  title = "Engine Calculations Chart",
  calculations,
}: ChartProps) {
  // Transform calculations data to chart format
  const chartData = useMemo(() => {
    // If explicit data is provided, use it
    if (data) {
      return data;
    }

    // If calculations are available, transform them
    if (calculations && calculations.length > 0) {
      // Filter successful calculations and sort by created_at (oldest first for chronological chart)
      const successfulCalculations = calculations
        .filter((calc) => calc.success && calc.result !== null)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

      return successfulCalculations.map((calc) => {
        // Parse result to number (result is stored as string)
        let value = 0;
        if (calc.result) {
          const parsed = parseFloat(calc.result);
          value = isNaN(parsed) ? 0 : parsed;
        }

        // Format time from created_at
        const date = new Date(calc.created_at);
        const timeLabel = `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        return {
          time: timeLabel,
          value: value,
          operation: calc.operation_type,
        };
      });
    }

    // Return empty array if no data
    return [];
  }, [calculations, data]);

  // Show loading state or empty state
  const hasData = chartData.length > 0;

  return (
    <Card className="h-full w-full flex flex-col min-h-0 overflow-hidden relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 relative z-10">
        {!hasData ? (
          <div className="h-full flex items-center justify-center">
            <div>No calculations data available</div>
          </div>
        ) : (
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
                formatter={(
                  value: number | undefined,
                  name?: string,
                  props?: { payload?: { operation?: string } }
                ) => {
                  const operation = props?.payload?.operation || "N/A";
                  return [`${value ?? 0} (${operation})`, name || "Result"];
                }}
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
        )}
      </CardContent>
    </Card>
  );
}
