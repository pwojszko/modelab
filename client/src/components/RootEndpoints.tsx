import { useRoot, useHealth } from "../hooks/useRoot";
import { JsonDisplay } from "./common/JsonDisplay";

export function RootEndpoints() {
  const rootQuery = useRoot();
  const healthQuery = useHealth();

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-2xl">🏠</span>
        Root Endpoints
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400">/</span>
          </h3>
          <button
            onClick={() => rootQuery.refetch()}
            disabled={rootQuery.isFetching}
            className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {rootQuery.isFetching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Get Root"
            )}
          </button>
          {rootQuery.data && <JsonDisplay data={rootQuery.data} />}
          {rootQuery.isError && (
            <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600 mt-3">
              <div className="text-sm font-medium text-red-300">
                Error: {rootQuery.error?.message}
              </div>
            </div>
          )}
        </div>
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-3 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400">/health</span>
          </h3>
          <button
            onClick={() => healthQuery.refetch()}
            disabled={healthQuery.isFetching}
            className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {healthQuery.isFetching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Check Health"
            )}
          </button>
          {healthQuery.data && <JsonDisplay data={healthQuery.data} />}
          {healthQuery.isError && (
            <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600 mt-3">
              <div className="text-sm font-medium text-red-300">
                Error: {healthQuery.error?.message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
