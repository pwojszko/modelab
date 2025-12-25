import { Link, useRouterState } from "@tanstack/react-router";
import { useEngineStatus } from "../features/engine/hooks/useEngine";
import { useHealth } from "../features/root/components/hooks/useRoot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "../components/common/StatusBadge";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { location } = useRouterState();
  const currentPath = location.pathname;

  const engineStatusQuery = useEngineStatus();
  const healthQuery = useHealth();

  const checkStatus = () => {
    engineStatusQuery.refetch();
    healthQuery.refetch();
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const navigationItems = [
    { path: "/", icon: "📊", label: "Dashboard" },
  ];

  return (
    <Card
      variant="dark"
      className="h-full w-full flex flex-col min-h-0 overflow-hidden relative p-4"
    >
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Menu
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-y-auto mb-4">
        <nav className="space-y-2 mb-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group block px-4 py-3 rounded-xl transition-all duration-200",
                isActive(item.path)
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-gray-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.01]"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </span>
            </Link>
          ))}
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
            <StatusBadge
              isLoading={healthQuery.isLoading}
              isSuccess={!!healthQuery.data}
              loadingText="Loading..."
              successText="Online"
              errorText="Offline"
            />
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted">
            <span className="font-medium">Engine:</span>
            <StatusBadge
              isLoading={engineStatusQuery.isLoading}
              isSuccess={!!engineStatusQuery.data?.success}
              loadingText="Loading..."
              successText="Ready"
              errorText="Unavailable"
            />
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
