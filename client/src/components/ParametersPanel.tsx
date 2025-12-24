import { useState } from "react";
import type { EngineResponse } from "../types";
import {
  useEngineStatus,
  useAddNumbers,
  useMultiplyNumbers,
  useCalculateFactorial,
} from "../hooks/useEngine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

export function ParametersPanel({
  onParameterChange,
  onEngineResult,
}: ParametersPanelProps) {
  const [parameters, setParameters] = useState<PumpParameters>({
    pressure: 5.0,
    flowRate: 100,
    mode: "auto",
    speed: 50,
  });

  const [showEngineSection, setShowEngineSection] = useState(false);
  const [addForm, setAddForm] = useState({ a: 0, b: 0 });
  const [multiplyForm, setMultiplyForm] = useState({ a: 0, b: 0 });
  const [factorialForm, setFactorialForm] = useState({ n: 0 });

  // React Query hooks
  const engineStatusQuery = useEngineStatus();
  const addMutation = useAddNumbers();
  const multiplyMutation = useMultiplyNumbers();
  const factorialMutation = useCalculateFactorial();

  const handleChange = (key: keyof PumpParameters, value: number | string) => {
    const newParams = { ...parameters, [key]: value };
    setParameters(newParams);
    onParameterChange?.(newParams);
  };

  return (
    <Card
      variant="dark"
      className="h-full w-full flex flex-col min-h-0 overflow-hidden relative"
    >
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-6 overflow-y-auto min-h-0">
        {/* Pressure Input */}
        <div>
          <Label className="mb-2">Pressure (bar)</Label>
          <Input
            type="number"
            value={parameters.pressure}
            onChange={(e) =>
              handleChange("pressure", parseFloat(e.target.value) || 0)
            }
            step="0.1"
            min="0"
            max="10"
          />
        </div>

        {/* Flow Rate Input */}
        <div>
          <Label className="mb-2">Flow Rate (L/min)</Label>
          <Input
            type="number"
            value={parameters.flowRate}
            onChange={(e) =>
              handleChange("flowRate", parseInt(e.target.value) || 0)
            }
            min="0"
            max="500"
          />
        </div>

        {/* Mode Select */}
        <div>
          <Label className="mb-2">Mode</Label>
          <Select
            value={parameters.mode}
            onValueChange={(value) => handleChange("mode", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
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
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${parameters.speed}%, #475569 ${parameters.speed}%, #475569 100%)`,
            }}
            min="0"
            max="100"
          />
          <div className="text-sm font-semibold text-blue-400 mt-2 text-center">
            {parameters.speed}%
          </div>
        </div>

        {/* Status Display */}
        <div className="pt-4">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between mb-3 p-3 bg-muted rounded-xl">
            <span className="text-sm font-medium">Status:</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Running
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
            <span className="text-sm font-medium">Temperature:</span>
            <span className="text-sm font-bold text-blue-400">42°C</span>
          </div>
        </div>

        {/* Engine API Section */}
        <div className="pt-4">
          <Separator className="mb-4" />
          <Button
            onClick={() => setShowEngineSection(!showEngineSection)}
            variant="ghost"
            className="w-full flex items-center justify-between mb-4"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              Engine Calculations
            </span>
            <span
              className={`transition-transform duration-200 ${
                showEngineSection ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </Button>

          {showEngineSection && (
            <div className="space-y-4">
              {/* Engine Status */}
              <div>
                <Button
                  onClick={() => engineStatusQuery.refetch()}
                  disabled={engineStatusQuery.isFetching}
                  variant="secondary"
                  className="w-full"
                >
                  {engineStatusQuery.isFetching ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Checking...
                    </span>
                  ) : (
                    "Check Engine Status"
                  )}
                </Button>
                {engineStatusQuery.data && (
                  <Alert
                    variant={
                      engineStatusQuery.data.success ? "default" : "destructive"
                    }
                    className="mt-2"
                  >
                    <AlertDescription className="text-xs">
                      {engineStatusQuery.data.message}
                    </AlertDescription>
                  </Alert>
                )}
                {engineStatusQuery.isError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription className="text-xs">
                      Error: {engineStatusQuery.error?.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Add Numbers */}
              <div>
                <Label className="text-xs mb-2">Add Numbers</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={addForm.a}
                    onChange={(e) =>
                      setAddForm({ ...addForm, a: Number(e.target.value) })
                    }
                    placeholder="a"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={addForm.b}
                    onChange={(e) =>
                      setAddForm({ ...addForm, b: Number(e.target.value) })
                    }
                    placeholder="b"
                    className="flex-1"
                  />
                  <Button
                    onClick={() =>
                      addMutation.mutate(addForm, {
                        onSuccess: (result) => {
                          onEngineResult?.(result, "add");
                        },
                      })
                    }
                    disabled={addMutation.isPending}
                    size="icon"
                  >
                    {addMutation.isPending ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "+"
                    )}
                  </Button>
                </div>
              </div>

              {/* Multiply Numbers */}
              <div>
                <Label className="text-xs mb-2">Multiply Numbers</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={multiplyForm.a}
                    onChange={(e) =>
                      setMultiplyForm({
                        ...multiplyForm,
                        a: Number(e.target.value),
                      })
                    }
                    placeholder="a"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={multiplyForm.b}
                    onChange={(e) =>
                      setMultiplyForm({
                        ...multiplyForm,
                        b: Number(e.target.value),
                      })
                    }
                    placeholder="b"
                    className="flex-1"
                  />
                  <Button
                    onClick={() =>
                      multiplyMutation.mutate(multiplyForm, {
                        onSuccess: (result) => {
                          onEngineResult?.(result, "multiply");
                        },
                      })
                    }
                    disabled={multiplyMutation.isPending}
                    size="icon"
                  >
                    {multiplyMutation.isPending ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "×"
                    )}
                  </Button>
                </div>
              </div>

              {/* Factorial */}
              <div>
                <Label className="text-xs mb-2">Factorial</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={factorialForm.n}
                    onChange={(e) =>
                      setFactorialForm({ n: Number(e.target.value) })
                    }
                    placeholder="n (0-20)"
                    min="0"
                    max="20"
                    className="flex-1"
                  />
                  <Button
                    onClick={() =>
                      factorialMutation.mutate(factorialForm, {
                        onSuccess: (result) => {
                          onEngineResult?.(result, "factorial");
                        },
                      })
                    }
                    disabled={factorialMutation.isPending}
                    size="icon"
                  >
                    {factorialMutation.isPending ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      "!"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
