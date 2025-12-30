"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TemperatureWidget } from "@/features/engine/components/TemperatureWidget";

export function PumpVisualization() {
  return (
    <Card className="h-full w-full flex items-center justify-center min-h-0 overflow-hidden relative">
      <CardContent className="p-6 w-full h-full relative">
        <div className="absolute top-4 left-4 z-20">
          <div className="min-w-[180px] p-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50 block" />
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-emerald-400 drop-shadow-lg">
                  Running
                </div>
                <div className="text-xs text-emerald-300/80 mt-0.5">
                  All systems operational
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <TemperatureWidget />
        </div>
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
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Inlet pipe - simple horizontal line */}
          <line
            x1="60"
            y1="200"
            x2="200"
            y2="200"
            stroke="#475569"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Pump body - simple circle */}
          <circle
            cx="300"
            cy="200"
            r="80"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            opacity="1"
          />
          {/* Impeller - simple rotating blades */}
          <g
            className="animate-spin"
            style={{ transformOrigin: "300px 200px", animationDuration: "2s" }}
          >
            <line
              x1="300"
              y1="200"
              x2="300"
              y2="140"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="200"
              x2="360"
              y2="200"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="200"
              x2="300"
              y2="260"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="300"
              y1="200"
              x2="240"
              y2="200"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Center dot */}
          <circle cx="300" cy="200" r="6" fill="#3b82f6" opacity="1" />
          {/* Inlet flow indicator - particles entering from left */}
          <>
            <circle
              cx="190"
              cy="200"
              r="4"
              fill="#3b82f6"
              className="opacity-0 animate-particle-in"
            />
            <circle
              cx="190"
              cy="200"
              r="4"
              fill="#3b82f6"
              className="opacity-0 animate-particle-in"
              style={{ animationDelay: "0.75s" }}
            />
          </>
          {/* Outlet pipe - simple horizontal line */}
          <line
            x1="400"
            y1="200"
            x2="550"
            y2="200"
            stroke="#475569"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Outlet flow indicator - particles exiting to right */}
          <>
            <circle
              cx="400"
              cy="200"
              r="4"
              fill="#3b82f6"
              className="opacity-0 animate-particle-out"
            />
            <circle
              cx="400"
              cy="200"
              r="4"
              fill="#3b82f6"
              className="opacity-0 animate-particle-out"
              style={{ animationDelay: "0.75s" }}
            />
          </>

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
            5.0 bar
          </text>
          <text
            x="300"
            y="345"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="16"
            fontWeight="500"
          >
            100 L/min
          </text>
        </svg>
      </CardContent>
    </Card>
  );
}
