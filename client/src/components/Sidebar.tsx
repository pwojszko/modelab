import { Link, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useEngineStatus } from "../hooks/useEngine";
import { useHealth } from "../hooks/useRoot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  // Queries - these auto-refetch every 30 seconds
  const engineStatusQuery = useEngineStatus();
  const healthQuery = useHealth();

  const checkStatus = () => {
    toast.promise(
      Promise.all([engineStatusQuery.refetch(), healthQuery.refetch()]),
      {
        loading: "Refreshing API status...",
        success: "API status refreshed - Server and engine status updated",
        error: "Failed to refresh API status",
      }
    );
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  return (
    <Card
      variant="dark"
      className="h-full w-full flex flex-col min-h-0 overflow-hidden relative"
    >
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Menu
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-y-auto mb-4">
        <nav className="space-y-2 mb-4">
          <Link
            to="/"
            className={`group block px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive("/")
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                : "text-gray-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.01]"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span className="font-medium">Dashboard</span>
            </span>
          </Link>
          <Link
            to="/engine"
            className={`group block px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive("/engine")
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                : "text-gray-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.01]"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Engine</span>
            </span>
          </Link>
          <Link
            to="/root"
            className={`group block px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive("/root")
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                : "text-gray-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.01]"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">🔧</span>
              <span className="font-medium">Root</span>
            </span>
          </Link>
        </nav>
      </CardContent>

      {/* API Status Section */}
      <div className="pt-4 px-6 flex-shrink-0">
        <Separator className="mb-4" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">API Status</h3>
          <Button
            onClick={checkStatus}
            disabled={engineStatusQuery.isFetching || healthQuery.isFetching}
            variant="outline"
            size="sm"
          >
            {engineStatusQuery.isFetching || healthQuery.isFetching ? (
              <span className="flex items-center gap-1">
                <span className="animate-spin">⏳</span>
                ...
              </span>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
            <span className="font-medium">Server:</span>
            <Badge
              variant={healthQuery.data ? "default" : "destructive"}
              className="flex items-center gap-1.5"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  healthQuery.data
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-red-400"
                }`}
              />
              {healthQuery.data ? "Online" : "Offline"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
            <span className="font-medium">Engine:</span>
            <Badge
              variant={
                engineStatusQuery.data?.success ? "default" : "destructive"
              }
              className="flex items-center gap-1.5"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  engineStatusQuery.data?.success
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-red-400"
                }`}
              />
              {engineStatusQuery.data?.success ? "Ready" : "Unavailable"}
            </Badge>
          </div>
        </div>

        {/* API Documentation Links */}
        <div className="mt-4 pt-4">
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
      </div>
    </Card>
  );
}
