import { useState } from "react";
import * as api from "../api";
import { JsonDisplay } from "./common/JsonDisplay";

interface RootEndpointsProps {
  loading: string | null;
  onApiCall: (
    call: () => Promise<any>,
    setState?: (data: any) => void,
    key?: string
  ) => Promise<void>;
}

export function RootEndpoints({ loading, onApiCall }: RootEndpointsProps) {
  const [rootData, setRootData] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Root Endpoints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">GET /</h3>
          <button
            onClick={() => onApiCall(api.getRoot, setRootData)}
            disabled={loading === "root"}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading === "root" ? "Loading..." : "Get Root"}
          </button>
          {rootData && <JsonDisplay data={rootData} />}
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">GET /health</h3>
          <button
            onClick={() => onApiCall(api.getHealth, setHealthData)}
            disabled={loading === "health"}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading === "health" ? "Loading..." : "Check Health"}
          </button>
          {healthData && <JsonDisplay data={healthData} />}
        </div>
      </div>
    </div>
  );
}
