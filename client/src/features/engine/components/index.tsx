import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EngineStatusCard } from "./EngineStatusCard";
import { AddCard } from "./AddCard";
import { MultiplyCard } from "./MultiplyCard";
import { FactorialCard } from "./FactorialCard";
import { ProcessStringCard } from "./ProcessStringCard";
import { SumArrayCard } from "./SumArrayCard";

export function EngineEndpoints() {
  return (
    <Card variant="dark" className="p-6 md:p-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          Engine Endpoints
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EngineStatusCard />
          <AddCard />
          <MultiplyCard />
          <FactorialCard />
          <ProcessStringCard />
          <SumArrayCard />
        </div>
      </CardContent>
    </Card>
  );
}
