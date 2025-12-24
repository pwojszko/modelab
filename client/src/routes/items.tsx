import { createFileRoute } from "@tanstack/react-router";
import { ItemsEndpoints } from "../components/ItemsEndpoints";

export const Route = createFileRoute("/items")({
  component: ItemsPage,
});

function ItemsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <ItemsEndpoints />
    </div>
  );
}
