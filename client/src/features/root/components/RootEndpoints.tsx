import { useRoot, useHealth } from "../api/useRoot";
import { JsonDisplay } from "../../../components/common/JsonDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function RootEndpoints() {
  const rootQuery = useRoot();
  const healthQuery = useHealth();

  return (
    <Card variant="dark" className="p-6 md:p-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          Root Endpoints
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            variant="nested"
            className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200"
          >
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-green-400 font-mono text-sm">GET</span>
                <span className="text-gray-400">/</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => rootQuery.refetch()}
                disabled={rootQuery.isFetching}
                className="w-full"
              >
                {rootQuery.isFetching ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Loading...
                  </span>
                ) : (
                  "Get Root"
                )}
              </Button>
              {rootQuery.data && <JsonDisplay data={rootQuery.data} />}
              {rootQuery.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Error: {rootQuery.error?.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
          <Card
            variant="nested"
            className="p-5 hover:border-green-500 hover:shadow-md transition-all duration-200"
          >
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-green-400 font-mono text-sm">GET</span>
                <span className="text-gray-400">/health</span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => healthQuery.refetch()}
                disabled={healthQuery.isFetching}
                variant="secondary"
                className="w-full"
              >
                {healthQuery.isFetching ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Loading...
                  </span>
                ) : (
                  "Check Health"
                )}
              </Button>
              {healthQuery.data && <JsonDisplay data={healthQuery.data} />}
              {healthQuery.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Error: {healthQuery.error?.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
