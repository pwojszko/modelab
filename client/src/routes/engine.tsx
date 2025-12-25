import { createFileRoute } from "@tanstack/react-router";
import { EngineEndpoints } from "../features/engine/components";

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
