import { useEngineStatus } from "../features/engine/hooks/useEngine";
import { useHealth } from "../features/root/components/hooks/useRoot";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusCard } from "../components/common/StatusCard";

export function Sidebar() {
  const engineStatusQuery = useEngineStatus();
  const healthQuery = useHealth();

  const checkStatus = () => {
    engineStatusQuery.refetch();
    healthQuery.refetch();
  };

  return (
    <Card
      variant="dark"
      className="h-full w-full flex flex-col min-h-0 overflow-hidden relative px-4 py-8"
    >
      <CardContent className="flex-1 min-h-0 overflow-y-auto mb-4 px-4">
        {/* API Status Section */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
              <h3 className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                API Status
              </h3>
            </div>
            <Button
              onClick={checkStatus}
              disabled={
                engineStatusQuery.throttledIsFetching ||
                healthQuery.throttledIsFetching
              }
              variant="outline"
              size="sm"
              className="border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-200"
            >
              {engineStatusQuery.throttledIsFetching ||
              healthQuery.throttledIsFetching ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin text-blue-400">⟳</span>
                  <span>Refreshing...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span>↻</span>
                  <span>Refresh</span>
                </span>
              )}
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: "🖥️",
                label: "Server",
                title: "API Server",
                color: "blue" as const,
                isLoading: healthQuery.throttledIsFetching,
                isSuccess: !!healthQuery.data,
                loadingText: "Loading...",
                successText: "Online",
                errorText: "Offline",
              },
              {
                icon: "⚙️",
                label: "Engine",
                title: "Calculation Engine",
                color: "purple" as const,
                isLoading: engineStatusQuery.throttledIsFetching,
                isSuccess: !!engineStatusQuery.data?.success,
                loadingText: "Loading...",
                successText: "Ready",
                errorText: "Unavailable",
              },
            ].map((status) => (
              <StatusCard key={status.label} {...status} />
            ))}
          </div>
        </div>
      </CardContent>

      {/* API Documentation Links - Fixed at bottom */}
      <div className="pt-4 px-6 flex-shrink-0 border-t border-slate-700">
        <Separator className="mb-4" />
        <h3 className="text-sm font-semibold text-gray-200 mb-2">Docs</h3>
        <div className="space-y-1.5">
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-slate-600/50"
          >
            <span className="flex items-center gap-2">
              <span>📚</span>
              <span>Swagger UI</span>
            </span>
          </a>
          <a
            href="http://localhost:8000/redoc"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-slate-600/50"
          >
            <span className="flex items-center gap-2">
              <span>📖</span>
              <span>ReDoc</span>
            </span>
          </a>
          <a
            href="http://localhost:8000/admin/engine-calculation/list"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-slate-600/50"
          >
            <span className="flex items-center gap-2">
              <span>⚙️</span>
              <span>Admin Panel</span>
            </span>
          </a>
          <a
            href="http://localhost:8001"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200 hover:scale-[1.02] border border-transparent hover:border-slate-600/50"
          >
            <span className="flex items-center gap-2">
              <span>📖</span>
              <span>Documentation</span>
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
}
