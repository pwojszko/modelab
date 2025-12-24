import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/Sidebar";
import { Toaster } from "../components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="dark h-screen w-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden relative">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 animate-pulse-slow pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="h-full w-full p-4 box-border relative z-10">
        <div className="h-full grid grid-cols-12 gap-4 min-h-0">
          {/* Left Sidebar */}
          <aside className="col-span-12 lg:col-span-2 h-full min-h-0">
            <Sidebar />
          </aside>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-10 h-full flex flex-col gap-4 min-h-0">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
