import { createFileRoute } from "@tanstack/react-router";
import { PumpVisualization } from "../components/PumpVisualization";
import { ParametersPanel } from "../components/ParametersPanel";
import { Chart } from "../components/Chart";
import { useState } from "react";
import type { EngineResponse } from "../types";

interface PumpParameters {
  pressure: number;
  flowRate: number;
  mode: string;
  speed: number;
}

interface EngineResult {
  operation: string;
  result: EngineResponse;
  timestamp: number;
}

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [pumpParameters, setPumpParameters] = useState<PumpParameters>({
    pressure: 5.0,
    flowRate: 100,
    mode: "auto",
    speed: 50,
  });

  const [engineResults, setEngineResults] = useState<EngineResult[]>([]);

  const handleParameterChange = (params: PumpParameters) => {
    setPumpParameters(params);
  };

  const handleEngineResult = (result: EngineResponse, operation: string) => {
    const newResult: EngineResult = {
      operation,
      result,
      timestamp: Date.now(),
    };
    setEngineResults((prev) => [...prev.slice(-19), newResult]); // Keep last 20 results
  };

  return (
    <>
      {/* Top Row: Pump Visualization and Parameters */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
        {/* Center - Pump Visualization */}
        <div className="col-span-12 lg:col-span-8 h-full min-h-0 overflow-hidden">
          <PumpVisualization
            pressure={pumpParameters.pressure}
            flowRate={pumpParameters.flowRate}
            status={pumpParameters.speed > 0 ? "running" : "stopped"}
          />
        </div>

        {/* Right - Parameters Panel */}
        <div className="col-span-12 lg:col-span-4 h-full min-h-0 overflow-hidden">
          <ParametersPanel
            onParameterChange={handleParameterChange}
            onEngineResult={handleEngineResult}
          />
        </div>
      </div>

      {/* Bottom - Chart */}
      <div className="h-64 flex-shrink-0 min-h-0 overflow-hidden">
        <Chart engineResults={engineResults} />
      </div>
    </>
  );
}

