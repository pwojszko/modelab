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
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Engine Endpoints
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Engine Status */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">GET /api/v1/engine/status</h3>
          <button
            onClick={() => onApiCall(api.getEngineStatus, setEngineStatus)}
            disabled={loading === "engineStatus"}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 mb-2"
          >
            {loading === "engineStatus" ? "Loading..." : "Check Status"}
          </button>
          {engineStatus && (
            <div className="p-2 bg-gray-100 rounded text-sm">
              <div
                className={
                  engineStatus.success ? "text-green-600" : "text-red-600"
                }
              >
                {engineStatus.message}
              </div>
            </div>
          )}
        </div>

        {/* Add */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">POST /api/v1/engine/add</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Number a"
              value={addForm.a}
              onChange={(e) =>
                setAddForm({ ...addForm, a: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Number b"
              value={addForm.b}
              onChange={(e) =>
                setAddForm({ ...addForm, b: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={() =>
                onApiCall(() => api.addNumbers(addForm), undefined, "add")
              }
              disabled={loading === "add"}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "add" ? "Calculating..." : "Add"}
            </button>
            {engineResults.add && (
              <div className="p-2 bg-gray-100 rounded text-sm">
                <div className="font-semibold text-gray-800">
                  Result: {engineResults.add.result}
                </div>
                <div className="text-gray-600 text-xs">
                  {engineResults.add.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Multiply */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">POST /api/v1/engine/multiply</h3>
          <div className="space-y-2">
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "multiply" ? "Calculating..." : "Multiply"}
            </button>
            {engineResults.multiply && (
              <div className="p-2 bg-gray-100 rounded text-sm">
                <div className="font-semibold text-gray-800">
                  Result: {engineResults.multiply.result}
                </div>
                <div className="text-gray-600 text-xs">
                  {engineResults.multiply.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Factorial */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">POST /api/v1/engine/factorial</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Number n (0-20)"
              value={factorialForm.n}
              onChange={(e) => setFactorialForm({ n: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "factorial"
                ? "Calculating..."
                : "Calculate Factorial"}
            </button>
            {engineResults.factorial && (
              <div className="p-2 bg-gray-100 rounded text-sm">
                <div className="font-semibold text-gray-800">
                  Result: {engineResults.factorial.result}
                </div>
                <div className="text-gray-600 text-xs">
                  {engineResults.factorial.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Process String */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">
            POST /api/v1/engine/process-string
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Text to process"
              value={stringForm.text}
              onChange={(e) => setStringForm({ text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "processString" ? "Processing..." : "Process String"}
            </button>
            {engineResults.processString && (
              <div className="p-2 bg-gray-100 rounded text-sm">
                <div className="font-semibold text-gray-800">
                  Result: {engineResults.processString.result}
                </div>
                <div className="text-gray-600 text-xs">
                  {engineResults.processString.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sum Array */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">POST /api/v1/engine/sum-array</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Numbers (comma-separated)"
              value={arrayForm.numbers}
              onChange={(e) => setArrayForm({ numbers: e.target.value })}
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "sumArray" ? "Calculating..." : "Sum Array"}
            </button>
            {engineResults.sumArray && (
              <div className="p-2 bg-gray-100 rounded text-sm">
                <div className="font-semibold text-gray-800">
                  Result: {engineResults.sumArray.result}
                </div>
                <div className="text-gray-600 text-xs">
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
