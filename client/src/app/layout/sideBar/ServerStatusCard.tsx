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
  const { data, success } = await getHealth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server</CardTitle>
        <CardDescription>Server Status</CardDescription>
        <CardAction>
          <Badge variant="successOutline">
            {success ? "Online" : "Offline"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <CardDescription>
          Last Updated: {data?.timestamp?.toLocaleString()}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
