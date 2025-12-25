import { createFileRoute } from "@tanstack/react-router";
import { PumpVisualization } from "../features/dashboard/components/PumpVisualization";
import { ParametersPanel } from "../features/dashboard/components/parametersPanel";
import { Chart } from "../features/dashboard/components/Chart";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
        <div className="col-span-12 lg:col-span-8 h-full min-h-0 overflow-hidden">
          <PumpVisualization />
        </div>

        <div className="col-span-12 lg:col-span-4 h-full min-h-0 overflow-hidden">
          <ParametersPanel />
        </div>
      </div>

      <div className="h-64 flex-shrink-0 min-h-0 overflow-hidden">
        <Chart />
      </div>
    </>
  );
}
