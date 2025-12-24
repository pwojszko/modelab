import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import {
  useEngineStatus,
  useAddNumbers,
  useMultiplyNumbers,
  useCalculateFactorial,
  useProcessString,
  useSumArray,
  engineKeys,
} from "../hooks/useEngine";
import type {
  AddRequest,
  MultiplyRequest,
  FactorialRequest,
  ProcessStringRequest,
} from "../types";

export function EngineEndpoints() {
  const queryClient = useQueryClient();

  // Queries
  const engineStatusQuery = useEngineStatus();

  // Mutations
  const addMutation = useAddNumbers();
  const multiplyMutation = useMultiplyNumbers();
  const factorialMutation = useCalculateFactorial();
  const processStringMutation = useProcessString();
  const sumArrayMutation = useSumArray();

  // Forms
  const addForm = useForm({
    defaultValues: {
      a: 0,
      b: 0,
    } as AddRequest,
    onSubmit: async ({ value }) => {
      addMutation.mutate(value);
    },
  });

  const multiplyForm = useForm({
    defaultValues: {
      a: 0,
      b: 0,
    } as MultiplyRequest,
    onSubmit: async ({ value }) => {
      multiplyMutation.mutate(value);
    },
  });

  const factorialForm = useForm({
    defaultValues: {
      n: 0,
    } as FactorialRequest,
    onSubmit: async ({ value }) => {
      factorialMutation.mutate(value);
    },
  });

  const stringForm = useForm({
    defaultValues: {
      text: "",
    } as ProcessStringRequest,
    onSubmit: async ({ value }) => {
      processStringMutation.mutate(value);
    },
  });

  const arrayForm = useForm({
    defaultValues: {
      numbers: "",
    } as { numbers: string },
    onSubmit: async ({ value }) => {
      const numbers = value.numbers
        .split(",")
        .map((n) => parseFloat(n.trim()))
        .filter((n) => !isNaN(n));
      sumArrayMutation.mutate({ numbers });
    },
  });

  // Get cached results
  const addResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("add"));
  const multiplyResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("multiply"));
  const factorialResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("factorial"));
  const processStringResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("processString"));
  const sumArrayResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("sumArray"));

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
            onClick={() => engineStatusQuery.refetch()}
            disabled={engineStatusQuery.isFetching}
            className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-3"
          >
            {engineStatusQuery.isFetching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Check Status"
            )}
          </button>
          {engineStatusQuery.data && (
            <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
              <div
                className={`text-sm font-medium ${
                  engineStatusQuery.data.success
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {engineStatusQuery.data.message}
              </div>
            </div>
          )}
          {engineStatusQuery.error && (
            <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
              <div className="text-sm font-medium text-red-300">
                Error: {engineStatusQuery.error.message}
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
            <addForm.Field name="a">
              {(field) => (
                <input
                  type="number"
                  placeholder="Number a"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </addForm.Field>
            <addForm.Field name="b">
              {(field) => (
                <input
                  type="number"
                  placeholder="Number b"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </addForm.Field>
            <addForm.Subscribe>
              {({ canSubmit }) => (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addForm.handleSubmit();
                    }}
                    disabled={!canSubmit || addMutation.isPending}
                    className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {addMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Calculating...
                      </span>
                    ) : (
                      "Add"
                    )}
                  </button>
                  {addResult && (
                    <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                      <div className="font-semibold text-gray-100 text-sm">
                        Result: {addResult.result}
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        {addResult.message}
                      </div>
                    </div>
                  )}
                  {addMutation.isError && (
                    <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                      <div className="text-sm font-medium text-red-300">
                        Error: {addMutation.error?.message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </addForm.Subscribe>
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
            <multiplyForm.Field name="a">
              {(field) => (
                <input
                  type="number"
                  placeholder="Number a"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </multiplyForm.Field>
            <multiplyForm.Field name="b">
              {(field) => (
                <input
                  type="number"
                  placeholder="Number b"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </multiplyForm.Field>
            <multiplyForm.Subscribe>
              {({ canSubmit }) => (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      multiplyForm.handleSubmit();
                    }}
                    disabled={!canSubmit || multiplyMutation.isPending}
                    className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {multiplyMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Calculating...
                      </span>
                    ) : (
                      "Multiply"
                    )}
                  </button>
                  {multiplyResult && (
                    <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                      <div className="font-semibold text-gray-100 text-sm">
                        Result: {multiplyResult.result}
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        {multiplyResult.message}
                      </div>
                    </div>
                  )}
                  {multiplyMutation.isError && (
                    <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                      <div className="text-sm font-medium text-red-300">
                        Error: {multiplyMutation.error?.message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </multiplyForm.Subscribe>
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
            <factorialForm.Field name="n">
              {(field) => (
                <input
                  type="number"
                  placeholder="Number n (0-20)"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </factorialForm.Field>
            <factorialForm.Subscribe>
              {({ canSubmit }) => (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      factorialForm.handleSubmit();
                    }}
                    disabled={!canSubmit || factorialMutation.isPending}
                    className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {factorialMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Calculating...
                      </span>
                    ) : (
                      "Calculate Factorial"
                    )}
                  </button>
                  {factorialResult && (
                    <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                      <div className="font-semibold text-gray-100 text-sm">
                        Result: {factorialResult.result}
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        {factorialResult.message}
                      </div>
                    </div>
                  )}
                  {factorialMutation.isError && (
                    <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                      <div className="text-sm font-medium text-red-300">
                        Error: {factorialMutation.error?.message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </factorialForm.Subscribe>
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
            <stringForm.Field name="text">
              {(field) => (
                <input
                  type="text"
                  placeholder="Text to process"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </stringForm.Field>
            <stringForm.Subscribe>
              {({ canSubmit }) => (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      stringForm.handleSubmit();
                    }}
                    disabled={!canSubmit || processStringMutation.isPending}
                    className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {processStringMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Processing...
                      </span>
                    ) : (
                      "Process String"
                    )}
                  </button>
                  {processStringResult && (
                    <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                      <div className="font-semibold text-gray-100 text-sm">
                        Result: {processStringResult.result}
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        {processStringResult.message}
                      </div>
                    </div>
                  )}
                  {processStringMutation.isError && (
                    <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                      <div className="text-sm font-medium text-red-300">
                        Error: {processStringMutation.error?.message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </stringForm.Subscribe>
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
            <arrayForm.Field name="numbers">
              {(field) => (
                <input
                  type="text"
                  placeholder="Numbers (comma-separated)"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </arrayForm.Field>
            <arrayForm.Subscribe>
              {({ canSubmit }) => (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      arrayForm.handleSubmit();
                    }}
                    disabled={!canSubmit || sumArrayMutation.isPending}
                    className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {sumArrayMutation.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Calculating...
                      </span>
                    ) : (
                      "Sum Array"
                    )}
                  </button>
                  {sumArrayResult && (
                    <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
                      <div className="font-semibold text-gray-100 text-sm">
                        Result: {sumArrayResult.result}
                      </div>
                      <div className="text-gray-300 text-xs mt-1">
                        {sumArrayResult.message}
                      </div>
                    </div>
                  )}
                  {sumArrayMutation.isError && (
                    <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                      <div className="text-sm font-medium text-red-300">
                        Error: {sumArrayMutation.error?.message}
                      </div>
                    </div>
                  )}
                </>
              )}
            </arrayForm.Subscribe>
          </div>
        </div>
      </div>
    </div>
  );
}
