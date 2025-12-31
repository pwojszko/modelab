import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEngineStatus } from "@/features/engine/services/engine";

export async function EngineStatusCard() {
  const { data, success } = await getEngineStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engine</CardTitle>
        <CardDescription>Calculation Engine</CardDescription>
        <CardAction>
          <Badge variant="successOutline">
            {success ? "Online" : "Offline"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <CardDescription>
          Last Updated: {data?.timestamp.toLocaleString()}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
