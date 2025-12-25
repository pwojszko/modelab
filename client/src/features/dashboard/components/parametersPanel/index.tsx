import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { PumpStatusDisplay } from "@/features/dashboard/components/parametersPanel/PumpStatusDisplay";

export function ParametersPanel() {
  return (
    <Card
      variant="dark"
      className="h-full w-full flex flex-col min-h-0 overflow-hidden relative"
    >
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-6 overflow-y-auto min-h-0">
        <FieldGroup className="space-y-6">
          <PumpStatusDisplay />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
