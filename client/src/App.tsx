import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { PumpVisualization } from "./components/PumpVisualization";
import { ParametersPanel } from "./components/ParametersPanel";
import { Chart } from "./components/Chart";
import type { EngineResponse } from "./types";

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

function App() {
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
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
      <div className="h-full w-full p-4 box-border">
        <div className="h-full grid grid-cols-12 gap-4 min-h-0">
          {/* Left Sidebar */}
          <aside className="col-span-12 lg:col-span-2 h-full min-h-0">
            <Sidebar />
          </aside>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-10 h-full flex flex-col gap-4 min-h-0">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
