import { useEngineStatus } from "../hooks/useEngine";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EngineStatusCard() {
  const engineStatusQuery = useEngineStatus();

  return (
    <Card
      variant="nested"
      className="p-5 hover:border-green-500 hover:shadow-md transition-all duration-200"
    >
      <CardHeader>
        <h3 className="font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm">GET</span>
          <span className="text-gray-400 text-sm">/api/v1/engine/status</span>
        </h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={() => engineStatusQuery.refetchWithToast()}
          disabled={engineStatusQuery.throttledIsFetching}
          variant="secondary"
          className="w-full"
        >
          {engineStatusQuery.throttledIsFetching ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Loading...
            </span>
          ) : (
            "Check Status"
          )}
        </Button>
        {engineStatusQuery.data && (
          <Alert
            variant={engineStatusQuery.data.success ? "default" : "destructive"}
          >
            <AlertDescription className="text-sm font-medium">
              {engineStatusQuery.data.message}
            </AlertDescription>
          </Alert>
        )}
        {engineStatusQuery.error && (
          <Alert variant="destructive">
            <AlertDescription>
              Error: {engineStatusQuery.error.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
