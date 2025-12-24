import { createFileRoute } from "@tanstack/react-router";
import { RootEndpoints } from "../components/RootEndpoints";

export const Route = createFileRoute("/root")({
  component: RootPage,
});

function RootPage() {
  return (
    <div className="h-full overflow-y-auto">
      <RootEndpoints />
    </div>
  );
}

