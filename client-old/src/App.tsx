import { Sidebar } from "./layout/Sidebar";
import { PumpVisualization } from "./features/engine/components/PumpVisualization";
import { ParametersPanel } from "./features/engine/components/ParametersPanel";
import { Chart } from "./features/engine/components/EngineChart";

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
      <div className="h-full w-full p-4 box-border">
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

            <div className="h-64 flex-shrink-0 min-h-0 overflow-hidden">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
