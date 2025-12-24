import { createFileRoute } from "@tanstack/react-router";
import { EngineEndpoints } from "../components/EngineEndpoints";

export const Route = createFileRoute("/engine")({
  component: EnginePage,
});

function EnginePage() {
  return (
    <div className="h-full overflow-y-auto">
      <EngineEndpoints />
    </div>
  );
}
