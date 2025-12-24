import { createFileRoute } from "@tanstack/react-router";
import { UsersEndpoints } from "../components/UsersEndpoints";

export const Route = createFileRoute("/users")({
  component: UsersPage,
});

function UsersPage() {
  return (
    <div className="h-full overflow-y-auto">
      <UsersEndpoints />
    </div>
  );
}

