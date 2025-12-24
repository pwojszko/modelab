import { Link, useRouterState } from "@tanstack/react-router";
import { useEngineStatus } from "../hooks/useEngine";
import { useHealth } from "../hooks/useRoot";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  // Queries - these auto-refetch every 30 seconds
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

  return (
    <aside className="h-full w-full bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 flex flex-col min-h-0 overflow-hidden relative">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
      
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 flex-shrink-0 relative z-10">
        Menu
      </h2>
      
      <nav className="flex-1 space-y-2 min-h-0 overflow-y-auto mb-4 relative z-10">
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

      {/* API Status Section */}
      <div className="pt-4 border-t border-slate-700/50 flex-shrink-0 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-200">API Status</h3>
          <button
            onClick={checkStatus}
            disabled={engineStatusQuery.isFetching || healthQuery.isFetching}
            className="text-xs px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600 rounded-lg text-gray-300 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-600/50"
          >
            {engineStatusQuery.isFetching || healthQuery.isFetching ? (
              <span className="flex items-center gap-1">
                <span className="animate-spin">⏳</span>
                ...
              </span>
            ) : (
              "Refresh"
            )}
          </button>
        </div>
        
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
            <span className="text-gray-400 font-medium">Server:</span>
            <span className={`flex items-center gap-1.5 font-semibold ${
              healthQuery.data ? "text-emerald-400" : "text-red-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                healthQuery.data ? "bg-emerald-400 animate-pulse" : "bg-red-400"
              }`} />
              {healthQuery.data ? "Online" : "Offline"}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
            <span className="text-gray-400 font-medium">Engine:</span>
            <span className={`flex items-center gap-1.5 font-semibold ${
              engineStatusQuery.data?.success ? "text-emerald-400" : "text-red-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                engineStatusQuery.data?.success ? "bg-emerald-400 animate-pulse" : "bg-red-400"
              }`} />
              {engineStatusQuery.data?.success ? "Ready" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* API Documentation Links */}
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">API Docs</h3>
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
    </aside>
  );
}

