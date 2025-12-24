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

  const maxValue = Math.max(...chartData.map((d) => d.value), 100);
  const chartHeight = 180;
  const chartWidth = 800;
  const padding = 40;

  const points = chartData.map((d, i) => {
    const x =
      padding + (i / (chartData.length - 1)) * (chartWidth - 2 * padding);
    const y =
      chartHeight -
      padding -
      (d.value / maxValue) * (chartHeight - 2 * padding);
    return { x, y, value: d.value };
  });

  const pathData =
    points.length > 0
      ? `M ${points[0].x} ${points[0].y} ${points
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(" ")}`
      : "";

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 flex flex-col min-h-0 overflow-hidden relative">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
      
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex-shrink-0 relative z-10">
        {title}
      </h2>
      <div className="flex-1 overflow-auto min-h-0 relative z-10">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <g key={ratio}>
              <line
                x1={padding}
                y1={padding + ratio * (chartHeight - 2 * padding)}
                x2={chartWidth - padding}
                y2={padding + ratio * (chartHeight - 2 * padding)}
                stroke="#475569"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <text
                x={padding - 10}
                y={padding + ratio * (chartHeight - 2 * padding) + 4}
                textAnchor="end"
                fill="#94a3b8"
                fontSize="12"
                fontWeight="500"
              >
                {Math.round(maxValue * (1 - ratio))}
              </text>
            </g>
          ))}

          {/* Chart area */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Area under curve */}
          <path
            d={`${pathData} L ${points[points.length - 1].x} ${
              chartHeight - padding
            } L ${points[0].x} ${chartHeight - padding} Z`}
            fill="url(#gradient)"
          />

          {/* Line */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="#60a5fa" 
            strokeWidth="3"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <circle 
              key={i} 
              cx={point.x} 
              cy={point.y} 
              r="5" 
              fill="#60a5fa"
              stroke="#1e40af"
              strokeWidth="2"
              className="hover:r-6 transition-all"
            >
              <title>{`${chartData[i].time}: ${point.value.toFixed(1)}`}</title>
            </circle>
          ))}

          {/* X-axis labels */}
          {chartData
            .filter((_, i) => i % 4 === 0)
            .map((d, i) => {
              const index = i * 4;
              const x =
                padding +
                (index / (chartData.length - 1)) * (chartWidth - 2 * padding);
              return (
                <text
                  key={i}
                  x={x}
                  y={chartHeight - padding + 20}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                  fontWeight="500"
                >
                  {d.time}
                </text>
              );
            })}
        </svg>
      </div>
    </div>
  );
}
