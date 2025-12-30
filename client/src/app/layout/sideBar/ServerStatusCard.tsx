import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHealth } from "@/features/root/api/root";

export async function ServerStatusCard() {
  const healthQuery = await getHealth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server</CardTitle>
      </CardHeader>

      <CardContent>
        <CardAction>
          <Badge variant="successOutline">Online</Badge>
        </CardAction>

        <CardDescription>Server Status</CardDescription>
      </CardContent>
    </Card>
  );
}
