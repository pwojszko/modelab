import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarLinks } from "./SidebarLinks";
import { EngineStatusCard } from "./EngineStatusCard";
import { ServerStatusCard } from "./ServerStatusCard";

export async function Sidebar() {
  return (
    <Card className="h-full w-full flex flex-col min-h-0 overflow-hidden relative px-4 py-8">
      <CardHeader>
        <CardTitle>API Status</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-y-auto mb-4 px-4">
        <div className="space-y-3">
          <ServerStatusCard />
          <EngineStatusCard />
        </div>
      </CardContent>

      <Separator />

      <SidebarLinks />
    </Card>
  );
}
