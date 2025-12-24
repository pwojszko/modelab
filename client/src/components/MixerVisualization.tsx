interface MixerVisualizationProps {
  speed?: number;
  temperature?: number;
  status?: "running" | "stopped" | "error";
}

export function MixerVisualization({
  speed = 0,
  temperature = 0,
  status = "stopped",
}: MixerVisualizationProps) {
  const isRunning = status === "running";
  const mixerColor = isRunning ? "#2563eb" : "#4b5563";
  const mixerLight = isRunning ? "#3b82f6" : "#6b7280";
  const mixerDark = isRunning ? "#1e40af" : "#374151";
  const bowlColor = isRunning ? "#475569" : "#334155";

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
          {/* Gradient for mixer head */}
          <linearGradient id="mixerHeadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={mixerLight} stopOpacity="1" />
            <stop offset="50%" stopColor={mixerColor} stopOpacity="1" />
            <stop offset="100%" stopColor={mixerDark} stopOpacity="1" />
          </linearGradient>

          {/* Gradient for mixer bowl */}
          <linearGradient id="bowlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="1" />
            <stop offset="50%" stopColor={bowlColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
          </linearGradient>

          {/* Gradient for mixing blades */}
          <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="1" />
            <stop offset="100%" stopColor="#475569" stopOpacity="1" />
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
        </defs>

        {/* Background shadow */}
        <ellipse
          cx="300"
          cy="380"
          rx="200"
          ry="50"
          fill="#000000"
          opacity="0.2"
        />

        {/* Mixer head - main body */}
        <rect
          x="200"
          y="60"
          width="200"
          height="80"
          fill="url(#mixerHeadGradient)"
          stroke="#1e293b"
          strokeWidth="2"
          rx="8"
          filter={isRunning ? "url(#glow)" : "url(#shadow)"}
          opacity={isRunning ? 1 : 0.7}
        />

        {/* Mixer head - front panel */}
        <rect
          x="220"
          y="75"
          width="160"
          height="50"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
          rx="4"
        />

        {/* Speed display */}
        <text
          x="300"
          y="105"
          textAnchor="middle"
          fill={isRunning ? "#10b981" : "#6b7280"}
          fontSize="18"
          fontWeight="bold"
          fontFamily="monospace"
        >
          {speed} RPM
        </text>

        {/* Mixer head - side details */}
        <rect
          x="200"
          y="70"
          width="15"
          height="70"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
          rx="3"
        />
        <rect
          x="385"
          y="70"
          width="15"
          height="70"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
          rx="3"
        />

        {/* Mixer arm - connecting head to attachment */}
        <rect
          x="290"
          y="140"
          width="20"
          height="40"
          fill="url(#mixerHeadGradient)"
          stroke="#1e293b"
          strokeWidth="1"
          rx="3"
          filter="url(#shadow)"
        />

        {/* Mixer attachment point */}
        <circle
          cx="300"
          cy="185"
          r="18"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* Mixing bowl - outer rim */}
        <ellipse
          cx="300"
          cy="280"
          rx="180"
          ry="30"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* Mixing bowl - main body */}
        <ellipse
          cx="300"
          cy="260"
          rx="170"
          ry="120"
          fill="url(#bowlGradient)"
          stroke="#1e293b"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* Mixing bowl - inner surface */}
        <ellipse
          cx="300"
          cy="250"
          rx="150"
          ry="100"
          fill="none"
          stroke="#1e293b"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Mixing blades - rotating whisk */}
        {isRunning ? (
          <g>
            {/* Main shaft */}
            <line
              x1="300"
              y1="185"
              x2="300"
              y2="250"
              stroke="#475569"
              strokeWidth="4"
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 300 250"
                to="360 300 250"
                dur={`${2 - (speed / 100)}s`}
                repeatCount="indefinite"
              />
            </line>

            {/* Blade 1 - top */}
            <path
              d="M 300 250 L 300 200 L 310 210 L 300 250 Z"
              fill="url(#bladeGradient)"
              stroke="#334155"
              strokeWidth="1"
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 300 250"
                to="360 300 250"
                dur={`${2 - (speed / 100)}s`}
                repeatCount="indefinite"
              />
            </path>

            {/* Blade 2 - right */}
            <path
              d="M 300 250 L 350 250 L 340 260 L 300 250 Z"
              fill="url(#bladeGradient)"
              stroke="#334155"
              strokeWidth="1"
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 300 250"
                to="360 300 250"
                dur={`${2 - (speed / 100)}s`}
                repeatCount="indefinite"
              />
            </path>

            {/* Blade 3 - bottom */}
            <path
              d="M 300 250 L 300 300 L 290 290 L 300 250 Z"
              fill="url(#bladeGradient)"
              stroke="#334155"
              strokeWidth="1"
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 300 250"
                to="360 300 250"
                dur={`${2 - (speed / 100)}s`}
                repeatCount="indefinite"
              />
            </path>

            {/* Blade 4 - left */}
            <path
              d="M 300 250 L 250 250 L 260 240 L 300 250 Z"
              fill="url(#bladeGradient)"
              stroke="#334155"
              strokeWidth="1"
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 300 250"
                to="360 300 250"
                dur={`${2 - (speed / 100)}s`}
                repeatCount="indefinite"
              />
            </path>

            {/* Secondary whisk - smaller */}
            <circle
              cx="300"
              cy="250"
              r="40"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              opacity="0.6"
              strokeDasharray="5,5"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 300 250"
                to="0 300 250"
                dur={`${1.5 - (speed / 150)}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Mixing particles - splashing effect */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * (Math.PI / 180);
              const radius = 80 + (i % 3) * 20;
              return (
                <circle
                  key={`particle-${i}`}
                  cx={300 + Math.cos(angle) * radius}
                  cy={250 + Math.sin(angle) * radius}
                  r="3"
                  fill="#60a5fa"
                  opacity="0.7"
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur="0.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.1}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0.3;0.7"
                    dur="0.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.1}s`}
                  />
                </circle>
              );
            })}
          </g>
        ) : (
          <g>
            {/* Static blades when stopped */}
            <line x1="300" y1="185" x2="300" y2="250" stroke="#6b7280" strokeWidth="4" opacity="0.5" />
            <line x1="300" y1="250" x2="300" y2="200" stroke="#6b7280" strokeWidth="2" opacity="0.5" />
            <line x1="300" y1="250" x2="350" y2="250" stroke="#6b7280" strokeWidth="2" opacity="0.5" />
            <line x1="300" y1="250" x2="300" y2="300" stroke="#6b7280" strokeWidth="2" opacity="0.5" />
            <line x1="300" y1="250" x2="250" y2="250" stroke="#6b7280" strokeWidth="2" opacity="0.5" />
          </g>
        )}

        {/* Bowl stand/base */}
        <rect
          x="250"
          y="320"
          width="100"
          height="15"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
          rx="3"
          filter="url(#shadow)"
        />

        {/* Base supports */}
        <rect x="260" y="335" width="20" height="10" fill="#0f172a" rx="2" />
        <rect x="290" y="335" width="20" height="10" fill="#0f172a" rx="2" />
        <rect x="320" y="335" width="20" height="10" fill="#0f172a" rx="2" />

        {/* Control panel */}
        <rect
          x="220"
          y="85"
          width="60"
          height="30"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1"
          rx="3"
        />

        {/* Speed indicator bars */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`bar-${i}`}
            x={225 + i * 12}
            y={95 + (4 - i) * 4}
            width="8"
            height={4 + i * 2}
            fill={speed > i * 20 ? (isRunning ? "#10b981" : "#6b7280") : "#374151"}
            rx="1"
          />
        ))}

        {/* Status indicator - LED style */}
        <g>
          {/* LED glow */}
          {status === "running" && (
            <circle cx="300" cy="360" r="18" fill="#10b981" opacity="0.3">
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
            cy="360"
            r="16"
            fill={status === "running" ? "#10b981" : status === "error" ? "#ef4444" : "#6b7280"}
            stroke="#1e293b"
            strokeWidth="2"
            filter="url(#shadow)"
          />
          {/* LED highlight */}
          <circle cx="295" cy="355" r="5" fill="#ffffff" opacity="0.6" />
          <text
            x="300"
            y="365"
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
            y="400"
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="16"
            fontWeight="600"
          >
            Speed: {speed} RPM
          </text>
          <text
            x="300"
            y="420"
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="16"
            fontWeight="600"
          >
            Temperature: {temperature.toFixed(1)}°C
          </text>
        </g>
      </svg>
    </div>
  );
}


