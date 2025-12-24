interface ComputerVisualizationProps {
  cpuUsage?: number;
  memoryUsage?: number;
  status?: "running" | "stopped" | "error";
}

export function ComputerVisualization({
  cpuUsage = 0,
  memoryUsage = 0,
  status = "stopped",
}: ComputerVisualizationProps) {
  const isRunning = status === "running";
  const screenColor = isRunning ? "#1e293b" : "#0f172a";
  const screenGlow = isRunning ? "#3b82f6" : "#475569";
  const monitorColor = isRunning ? "#334155" : "#1e293b";
  const keyboardColor = isRunning ? "#475569" : "#334155";

  return (
    <div className="h-full w-full bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 backdrop-blur-sm flex items-center justify-center min-h-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid meet"
        className="max-w-full max-h-full"
      >
        <defs>
          {/* Gradient for monitor screen */}
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" stopOpacity={isRunning ? "0.3" : "0.1"} />
            <stop offset="50%" stopColor={screenColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
          </linearGradient>

          {/* Gradient for monitor bezel */}
          <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" stopOpacity="1" />
            <stop offset="50%" stopColor={monitorColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
          </linearGradient>

          {/* Gradient for keyboard */}
          <linearGradient id="keyboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="1" />
            <stop offset="100%" stopColor={keyboardColor} stopOpacity="1" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter for running state */}
          {isRunning && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          {/* Screen scanlines effect */}
          <pattern id="scanlines" x="0" y="0" width="100%" height="4" patternUnits="userSpaceOnUse">
            <rect width="100%" height="2" fill="#000000" opacity="0.1" />
            <rect y="2" width="100%" height="2" fill="transparent" />
          </pattern>
        </defs>

        {/* Background shadow */}
        <ellipse
          cx="300"
          cy="380"
          rx="180"
          ry="40"
          fill="#000000"
          opacity="0.3"
        />

        {/* Monitor stand/base */}
        <rect
          x="280"
          y="280"
          width="40"
          height="20"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
          rx="3"
          filter="url(#shadow)"
        />

        {/* Monitor stand arm */}
        <rect
          x="290"
          y="200"
          width="20"
          height="80"
          fill="url(#monitorGradient)"
          stroke="#1e293b"
          strokeWidth="1"
          rx="2"
          filter="url(#shadow)"
        />

        {/* Monitor bezel - outer frame */}
        <rect
          x="100"
          y="80"
          width="400"
          height="280"
          fill="url(#monitorGradient)"
          stroke="#1e293b"
          strokeWidth="2"
          rx="8"
          filter={isRunning ? "url(#glow)" : "url(#shadow)"}
        />

        {/* Monitor bezel - inner frame */}
        <rect
          x="120"
          y="100"
          width="360"
          height="240"
          fill="#0f172a"
          stroke="#1e293b"
          strokeWidth="1"
          rx="4"
        />

        {/* Monitor screen */}
        <rect
          x="130"
          y="110"
          width="340"
          height="220"
          fill="url(#screenGradient)"
          stroke={screenGlow}
          strokeWidth="2"
          rx="3"
          opacity={isRunning ? 1 : 0.6}
        />

        {/* Screen content - code lines when running */}
        {isRunning && (
          <g>
            {/* Scanlines overlay */}
            <rect
              x="130"
              y="110"
              width="340"
              height="220"
              fill="url(#scanlines)"
              opacity="0.3"
            />
            
            {/* Code-like lines */}
            <text x="150" y="140" fill="#10b981" fontSize="12" fontFamily="monospace" opacity="0.8">
              {`> CPU: ${cpuUsage.toFixed(1)}%`}
            </text>
            <text x="150" y="160" fill="#3b82f6" fontSize="12" fontFamily="monospace" opacity="0.8">
              {`> Memory: ${memoryUsage.toFixed(1)}%`}
            </text>
            <text x="150" y="180" fill="#8b5cf6" fontSize="12" fontFamily="monospace" opacity="0.8">
              {`> Status: ${status.toUpperCase()}`}
            </text>
            <text x="150" y="200" fill="#64748b" fontSize="12" fontFamily="monospace" opacity="0.6">
              {`> System: Online`}
            </text>
            <text x="150" y="220" fill="#64748b" fontSize="12" fontFamily="monospace" opacity="0.6">
              {`> Processes: Active`}
            </text>
            
            {/* Animated cursor */}
            <rect x="320" y="220" width="8" height="12" fill="#ffffff" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.8;0;0.8"
                dur="1s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        )}

        {/* Monitor power LED */}
        <g>
          {isRunning && (
            <circle cx="480" cy="100" r="8" fill="#10b981" opacity="0.4">
              <animate
                attributeName="r"
                values="8;10;8"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}
          <circle
            cx="480"
            cy="100"
            r="6"
            fill={status === "running" ? "#10b981" : status === "error" ? "#ef4444" : "#6b7280"}
            stroke="#1e293b"
            strokeWidth="1"
          />
        </g>

        {/* Keyboard */}
        <g>
          {/* Keyboard shadow */}
          <ellipse
            cx="300"
            cy="360"
            rx="200"
            ry="15"
            fill="#000000"
            opacity="0.3"
          />
          
          {/* Keyboard base */}
          <rect
            x="120"
            y="340"
            width="360"
            height="40"
            fill="url(#keyboardGradient)"
            stroke="#1e293b"
            strokeWidth="1"
            rx="4"
            filter="url(#shadow)"
          />

          {/* Keyboard keys - top row */}
          {[140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440].map((x, i) => (
            <rect
              key={`top-${i}`}
              x={x}
              y="350"
              width="20"
              height="12"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="0.5"
              rx="2"
              opacity={isRunning ? 0.8 : 0.5}
            />
          ))}

          {/* Keyboard keys - middle row */}
          {[130, 160, 190, 220, 250, 280, 310, 340, 370, 400, 430, 460].map((x, i) => (
            <rect
              key={`mid-${i}`}
              x={x}
              y="365"
              width="20"
              height="12"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="0.5"
              rx="2"
              opacity={isRunning ? 0.8 : 0.5}
            />
          ))}

          {/* Keyboard keys - bottom row */}
          {[150, 180, 210, 240, 270, 300, 330, 360, 390, 420].map((x, i) => (
            <rect
              key={`bot-${i}`}
              x={x}
              y="380"
              width="20"
              height="12"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="0.5"
              rx="2"
              opacity={isRunning ? 0.8 : 0.5}
            />
          ))}

          {/* Spacebar */}
          <rect
            x="200"
            y="380"
            width="200"
            height="12"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="0.5"
            rx="2"
            opacity={isRunning ? 0.8 : 0.5}
          />
        </g>

        {/* Status indicator - LED style */}
        <g>
          {/* LED glow */}
          {status === "running" && (
            <circle cx="300" cy="420" r="18" fill="#10b981" opacity="0.3">
              <animate
                attributeName="r"
                values="18;22;18"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          )}
          {/* LED body */}
          <circle
            cx="300"
            cy="420"
            r="16"
            fill={status === "running" ? "#10b981" : status === "error" ? "#ef4444" : "#6b7280"}
            stroke="#1e293b"
            strokeWidth="2"
            filter="url(#shadow)"
          />
          {/* LED highlight */}
          <circle cx="295" cy="415" r="5" fill="#ffffff" opacity="0.6" />
          <text
            x="300"
            y="425"
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="bold"
          >
            {status === "running" ? "ON" : status === "error" ? "!" : "OFF"}
          </text>
        </g>

        {/* Information labels */}
        <g>
          <text
            x="300"
            y="460"
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="16"
            fontWeight="600"
          >
            CPU: {cpuUsage.toFixed(1)}%
          </text>
          <text
            x="300"
            y="480"
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="16"
            fontWeight="600"
          >
            Memory: {memoryUsage.toFixed(1)}%
          </text>
        </g>
      </svg>
    </div>
  );
}


