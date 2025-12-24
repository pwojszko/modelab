interface PumpVisualizationProps {
  pressure?: number;
  flowRate?: number;
  status?: "running" | "stopped" | "error";
}

export function PumpVisualization({
  pressure = 0,
  flowRate = 0,
  status = "stopped",
}: PumpVisualizationProps) {
  const isRunning = status === "running";
  const pumpColor = isRunning ? "#3b82f6" : "#6b7280";
  const pipeColor = "#475569";

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 flex items-center justify-center min-h-0 overflow-hidden relative">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
      
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        className="max-w-full max-h-full relative z-10"
      >
        <defs>
          {/* Simple gradient */}
          <linearGradient id="pumpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={pumpColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={pumpColor} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Inlet pipe - simple horizontal line */}
        <line
          x1="50"
          y1="200"
          x2="210"
          y2="200"
          stroke={pipeColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Pump body - simple circle */}
        <circle
          cx="300"
          cy="200"
          r="80"
          fill="none"
          stroke={pumpColor}
          strokeWidth="8"
          opacity={isRunning ? 1 : 0.6}
        />

        {/* Impeller - simple rotating blades */}
        {isRunning ? (
          <g>
            <line
              x1="300"
              y1="200"
              x2="300"
              y2="140"
              stroke={pumpColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="200"
              x2="360"
              y2="200"
              stroke={pumpColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="200"
              x2="300"
              y2="260"
              stroke={pumpColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="200"
              x2="240"
              y2="200"
              stroke={pumpColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <g>
            <line
              x1="300"
              y1="200"
              x2="300"
              y2="140"
              stroke={pipeColor}
              strokeWidth="3"
              opacity="0.5"
            />
            <line
              x1="300"
              y1="200"
              x2="360"
              y2="200"
              stroke={pipeColor}
              strokeWidth="3"
              opacity="0.5"
            />
            <line
              x1="300"
              y1="200"
              x2="300"
              y2="260"
              stroke={pipeColor}
              strokeWidth="3"
              opacity="0.5"
            />
            <line
              x1="300"
              y1="200"
              x2="240"
              y2="200"
              stroke={pipeColor}
              strokeWidth="3"
              opacity="0.5"
            />
          </g>
        )}

        {/* Center dot */}
        <circle
          cx="300"
          cy="200"
          r="6"
          fill={pumpColor}
          opacity={isRunning ? 1 : 0.5}
        />

        {/* Inlet flow indicator - particles entering from left */}
        {isRunning && (
          <>
            <circle cx="190" cy="200" r="4" fill={pumpColor} opacity="0.8" />
            <circle cx="190" cy="200" r="4" fill={pumpColor} opacity="0.8" />
          </>
        )}

        {/* Outlet pipe - simple horizontal line */}
        <line
          x1="390"
          y1="200"
          x2="550"
          y2="200"
          stroke={pipeColor}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Outlet flow indicator - particles exiting to right */}
        {isRunning && (
          <>
            <circle cx="400" cy="200" r="4" fill={pumpColor} opacity="0.8" />
            <circle cx="400" cy="200" r="4" fill={pumpColor} opacity="0.8" />
          </>
        )}

        {/* Status indicator - simple circle */}
        <circle
          cx="300"
          cy="280"
          r="12"
          fill={
            status === "running"
              ? "#10b981"
              : status === "error"
              ? "#ef4444"
              : "#6b7280"
          }
        />

        {/* Information labels with enhanced styling */}
        <text
          x="300"
          y="320"
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="20"
          fontWeight="600"
          className="drop-shadow-lg"
        >
          {pressure.toFixed(1)} bar
        </text>
        <text
          x="300"
          y="345"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="16"
          fontWeight="500"
        >
          {flowRate} L/min
        </text>
      </svg>
    </div>
  );
}
