import { useState } from "react";
import * as engineService from "../service/engine";
import type { EngineResponse } from "../types";

interface PumpParameters {
  pressure: number;
  flowRate: number;
  mode: string;
  speed: number;
}

interface ParametersPanelProps {
  onParameterChange?: (params: PumpParameters) => void;
  onEngineResult?: (result: EngineResponse, operation: string) => void;
}

export function ParametersPanel({ onParameterChange, onEngineResult }: ParametersPanelProps) {
  const [parameters, setParameters] = useState<PumpParameters>({
    pressure: 5.0,
    flowRate: 100,
    mode: "auto",
    speed: 50,
  });

  const [showEngineSection, setShowEngineSection] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [engineStatus, setEngineStatus] = useState<EngineResponse | null>(null);
  const [addForm, setAddForm] = useState({ a: 0, b: 0 });
  const [multiplyForm, setMultiplyForm] = useState({ a: 0, b: 0 });
  const [factorialForm, setFactorialForm] = useState({ n: 0 });

  const handleChange = (key: keyof PumpParameters, value: number | string) => {
    const newParams = { ...parameters, [key]: value };
    setParameters(newParams);
    onParameterChange?.(newParams);
  };

  const handleApiCall = async (
    call: () => Promise<EngineResponse>,
    operation: string
  ) => {
    setLoading(operation);
    try {
      const result = await call();
      setLoading(null);
      onEngineResult?.(result, operation);
      return result;
    } catch (error) {
      setLoading(null);
      console.error(`Error in ${operation}:`, error);
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 flex flex-col min-h-0 overflow-hidden relative">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
      
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 flex-shrink-0 relative z-10">
        Parameters
      </h2>
      
      <div className="flex-1 space-y-6 overflow-y-auto min-h-0 relative z-10">
        {/* Pressure Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Pressure (bar)
          </label>
          <input
            type="number"
            value={parameters.pressure}
            onChange={(e) => handleChange("pressure", parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
            step="0.1"
            min="0"
            max="10"
          />
        </div>

        {/* Flow Rate Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Flow Rate (L/min)
          </label>
          <input
            type="number"
            value={parameters.flowRate}
            onChange={(e) => handleChange("flowRate", parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
            min="0"
            max="500"
          />
        </div>

        {/* Mode Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Mode
          </label>
          <select
            value={parameters.mode}
            onChange={(e) => handleChange("mode", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500 cursor-pointer"
          >
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        {/* Speed Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Speed (%)
          </label>
          <input
            type="range"
            value={parameters.speed}
            onChange={(e) => handleChange("speed", parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${parameters.speed}%, #475569 ${parameters.speed}%, #475569 100%)`
            }}
            min="0"
            max="100"
          />
          <div className="text-sm font-semibold text-blue-400 mt-2 text-center">
            {parameters.speed}%
          </div>
        </div>

        {/* Status Display */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-3 p-3 bg-slate-800/30 rounded-xl">
            <span className="text-sm font-medium text-gray-300">Status:</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Running
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
            <span className="text-sm font-medium text-gray-300">Temperature:</span>
            <span className="text-sm font-bold text-blue-400">42°C</span>
          </div>
        </div>

        {/* Engine API Section */}
        <div className="pt-4 border-t border-slate-700/50">
          <button
            onClick={() => setShowEngineSection(!showEngineSection)}
            className="w-full flex items-center justify-between text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200 mb-4 p-3 rounded-xl hover:bg-slate-700/30"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              Engine Calculations
            </span>
            <span className={`transition-transform duration-200 ${showEngineSection ? "rotate-180" : ""}`}>▼</span>
          </button>

          {showEngineSection && (
            <div className="space-y-4">
              {/* Engine Status */}
              <div>
                  <button
                    onClick={() => handleApiCall(engineService.getEngineStatus, "engineStatus")}
                    disabled={loading === "engineStatus"}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading === "engineStatus" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Checking...
                      </span>
                    ) : (
                      "Check Engine Status"
                    )}
                  </button>
                {engineStatus && (
                  <div className={`mt-2 p-2 rounded text-xs ${engineStatus.success ? "text-green-300 bg-green-900/20" : "text-red-300 bg-red-900/20"}`}>
                    {engineStatus.message}
                  </div>
                )}
              </div>

              {/* Add Numbers */}
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Add Numbers
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={addForm.a}
                    onChange={(e) => setAddForm({ ...addForm, a: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
                    placeholder="a"
                  />
                  <input
                    type="number"
                    value={addForm.b}
                    onChange={(e) => setAddForm({ ...addForm, b: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
                    placeholder="b"
                  />
                  <button
                    onClick={() => handleApiCall(() => engineService.addNumbers(addForm), "add")}
                    disabled={loading === "add"}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95"
                  >
                    {loading === "add" ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "+"
                    )}
                  </button>
                </div>
              </div>

              {/* Multiply Numbers */}
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Multiply Numbers
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={multiplyForm.a}
                    onChange={(e) => setMultiplyForm({ ...multiplyForm, a: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
                    placeholder="a"
                  />
                  <input
                    type="number"
                    value={multiplyForm.b}
                    onChange={(e) => setMultiplyForm({ ...multiplyForm, b: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
                    placeholder="b"
                  />
                  <button
                    onClick={() => handleApiCall(() => engineService.multiplyNumbers(multiplyForm), "multiply")}
                    disabled={loading === "multiply"}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95"
                  >
                    {loading === "multiply" ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "×"
                    )}
                  </button>
                </div>
              </div>

              {/* Factorial */}
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-2">
                  Factorial
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={factorialForm.n}
                    onChange={(e) => setFactorialForm({ n: Number(e.target.value) })}
                    className="flex-1 px-3 py-2 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-500"
                    placeholder="n (0-20)"
                    min="0"
                    max="20"
                  />
                  <button
                    onClick={() => handleApiCall(() => engineService.calculateFactorial(factorialForm), "factorial")}
                    disabled={loading === "factorial"}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95"
                  >
                    {loading === "factorial" ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "!"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

