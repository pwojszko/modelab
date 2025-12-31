import { Chart } from "@/features/engine/components/EngineChart";
import { ParametersPanel } from "@/features/engine/components/ParametersPanel";
import { PumpVisualization } from "@/features/engine/components/PumpVisualization";
import { getCalculations } from "@/features/engine/services/engine";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "./layout/sideBar/Sidebar";

export default async function Home() {
  const calculations = await getCalculations();

  return (
    <div className="h-screen w-screen bg-linear-to-br from-background via-background/80 to-background overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-transparent to-purple-900/20 animate-pulse-slow pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="h-full w-full p-4 box-border relative z-10">
        <div className="h-full grid grid-cols-12 gap-4 min-h-0">
          <aside className="col-span-12 lg:col-span-2 h-full min-h-0">
            <Sidebar />
          </aside>

          <div className="col-span-12 lg:col-span-10 h-full flex flex-col gap-4 min-h-0">
            <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
              <div className="col-span-12 lg:col-span-8 h-full min-h-0 overflow-hidden">
                <PumpVisualization />
              </div>

              <div className="col-span-12 lg:col-span-4 h-full min-h-0 overflow-hidden">
                <ParametersPanel />
              </div>
            </div>

            <div className="h-64 shrink-0 min-h-0 overflow-hidden">
              <Chart calculations={calculations.data ?? []} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
