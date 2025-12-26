import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { AddForm } from "@/features/engine/forms/AddForm";
import { MultiplyForm } from "@/features/engine/forms/MultiplyForm";
import { FactorialForm } from "@/features/engine/forms/FactorialForm";
import { ProcessStringForm } from "@/features/engine/forms/ProcessStringForm";
import { SumArrayForm } from "@/features/engine/forms/SumArrayForm";

export function ParametersPanel() {
  return (
    <Card
      variant="dark"
      className="h-full w-full flex flex-col min-h-0 overflow-hidden relative"
    >
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Operations
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-6 overflow-y-auto min-h-0">
        <FieldGroup className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-4 p-4">
              <AddForm />
              <MultiplyForm />
              <FactorialForm />
              <ProcessStringForm />
              <SumArrayForm />
            </div>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
