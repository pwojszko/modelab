import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { AddForm } from "@/features/engine/components/forms/AddForm";
import { MultiplyForm } from "@/features/engine/components/forms/MultiplyForm";
import { FactorialForm } from "@/features/engine/components/forms/FactorialForm";
import { ProcessStringForm } from "@/features/engine/components/forms/ProcessStringForm";
import { SumArrayForm } from "@/features/engine/components/forms/SumArrayForm";

export function ParametersPanel() {
  return (
    <Card className="h-full w-full flex flex-col min-h-0 overflow-hidden relative">
      <CardHeader className="shrink-0">
        <CardTitle className="text-2xl font-bold">Operations</CardTitle>
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
