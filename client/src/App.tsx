import { useState } from "react";
import type { EngineResponse } from "./api";
import { Header } from "./components/Header";
import { RootEndpoints } from "./components/RootEndpoints";
import { UsersEndpoints } from "./components/UsersEndpoints";
import { ItemsEndpoints } from "./components/ItemsEndpoints";
import { EngineEndpoints } from "./components/EngineEndpoints";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [engineResults, setEngineResults] = useState<
    Record<string, EngineResponse>
  >({});

  const handleApiCall = async (
    call: () => Promise<any>,
    setState?: (data: any) => void,
    key?: string
  ) => {
    setError(null);
    setLoading(key || "loading");
    try {
      const result = await call();
      if (setState) setState(result);
      if (key) setEngineResults((prev) => ({ ...prev, [key]: result }));
      return result;
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Header error={error} />

          <RootEndpoints loading={loading} onApiCall={handleApiCall} />

          <UsersEndpoints loading={loading} onApiCall={handleApiCall} />

          <ItemsEndpoints loading={loading} onApiCall={handleApiCall} />

          <EngineEndpoints
            loading={loading}
            engineResults={engineResults}
            onApiCall={handleApiCall}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
