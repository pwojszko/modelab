import { useState } from "react";
import * as api from "../api";
import type { EngineResponse } from "../api";

interface EngineEndpointsProps {
  loading: string | null;
  engineResults: Record<string, EngineResponse>;
  onApiCall: (
    call: () => Promise<any>,
    setState?: (data: any) => void,
    key?: string
  ) => Promise<void>;
}

export function EngineEndpoints({
  loading,
  engineResults,
  onApiCall,
}: EngineEndpointsProps) {
  const [engineStatus, setEngineStatus] = useState<EngineResponse | null>(null);
  const [addForm, setAddForm] = useState({ a: 0, b: 0 });
  const [multiplyForm, setMultiplyForm] = useState({ a: 0, b: 0 });
  const [factorialForm, setFactorialForm] = useState({ n: 0 });
  const [stringForm, setStringForm] = useState({ text: "" });
  const [arrayForm, setArrayForm] = useState({ numbers: "" });

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-2xl">⚙️</span>
        Engine Endpoints
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Engine Status */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400 text-sm">/api/v1/engine/status</span>
          </h3>
          <button
            onClick={() => onApiCall(api.getEngineStatus, setEngineStatus)}
            disabled={loading === "engineStatus"}
            className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-3"
          >
            {loading === "engineStatus" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Check Status"
            )}
          </button>
          {engineStatus && (
            <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
              <div
                className={`text-sm font-medium ${
                  engineStatus.success ? "text-green-300" : "text-red-300"
                }`}
              >
                {engineStatus.message}
              </div>
            </div>
          )}
        </div>

        {/* Add */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">/api/v1/engine/add</span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Number a"
              value={addForm.a}
              onChange={(e) =>
                setAddForm({ ...addForm, a: Number(e.target.value) })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="number"
              placeholder="Number b"
              value={addForm.b}
              onChange={(e) =>
                setAddForm({ ...addForm, b: Number(e.target.value) })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                onApiCall(() => api.addNumbers(addForm), undefined, "add")
              }
              disabled={loading === "add"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "add" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Calculating...
                </span>
              ) : (
                "Add"
              )}
            </button>
            {engineResults.add && (
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                <div className="font-semibold text-gray-100 text-sm">
                  Result: {engineResults.add.result}
                </div>
                <div className="text-gray-300 text-xs mt-1">
                  {engineResults.add.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Multiply */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">
              /api/v1/engine/multiply
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Number a"
              value={multiplyForm.a}
              onChange={(e) =>
                setMultiplyForm({
                  ...multiplyForm,
                  a: Number(e.target.value),
                })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="number"
              placeholder="Number b"
              value={multiplyForm.b}
              onChange={(e) =>
                setMultiplyForm({
                  ...multiplyForm,
                  b: Number(e.target.value),
                })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                onApiCall(
                  () => api.multiplyNumbers(multiplyForm),
                  undefined,
                  "multiply"
                )
              }
              disabled={loading === "multiply"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "multiply" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Calculating...
                </span>
              ) : (
                "Multiply"
              )}
            </button>
            {engineResults.multiply && (
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                <div className="font-semibold text-gray-100 text-sm">
                  Result: {engineResults.multiply.result}
                </div>
                <div className="text-gray-300 text-xs mt-1">
                  {engineResults.multiply.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Factorial */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">
              /api/v1/engine/factorial
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Number n (0-20)"
              value={factorialForm.n}
              onChange={(e) => setFactorialForm({ n: Number(e.target.value) })}
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                onApiCall(
                  () => api.calculateFactorial(factorialForm),
                  undefined,
                  "factorial"
                )
              }
              disabled={loading === "factorial"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "factorial" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Calculating...
                </span>
              ) : (
                "Calculate Factorial"
              )}
            </button>
            {engineResults.factorial && (
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                <div className="font-semibold text-gray-100 text-sm">
                  Result: {engineResults.factorial.result}
                </div>
                <div className="text-gray-300 text-xs mt-1">
                  {engineResults.factorial.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Process String */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">
              /api/v1/engine/process-string
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Text to process"
              value={stringForm.text}
              onChange={(e) => setStringForm({ text: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                onApiCall(
                  () => api.processString(stringForm),
                  undefined,
                  "processString"
                )
              }
              disabled={loading === "processString"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "processString" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing...
                </span>
              ) : (
                "Process String"
              )}
            </button>
            {engineResults.processString && (
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                <div className="font-semibold text-gray-100 text-sm">
                  Result: {engineResults.processString.result}
                </div>
                <div className="text-gray-300 text-xs mt-1">
                  {engineResults.processString.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sum Array */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">
              /api/v1/engine/sum-array
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Numbers (comma-separated)"
              value={arrayForm.numbers}
              onChange={(e) => setArrayForm({ numbers: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() => {
                const numbers = arrayForm.numbers
                  .split(",")
                  .map((n) => parseFloat(n.trim()))
                  .filter((n) => !isNaN(n));
                onApiCall(
                  () => api.sumArray({ numbers }),
                  undefined,
                  "sumArray"
                );
              }}
              disabled={loading === "sumArray"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "sumArray" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Calculating...
                </span>
              ) : (
                "Sum Array"
              )}
            </button>
            {engineResults.sumArray && (
              <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                <div className="font-semibold text-gray-100 text-sm">
                  Result: {engineResults.sumArray.result}
                </div>
                <div className="text-gray-300 text-xs mt-1">
                  {engineResults.sumArray.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
