import { useSumArray } from "../hooks/useEngine";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SumArrayForm } from "@/features/engine/forms/SumArrayForm";

export function SumArrayCard() {
  const sumArrayMutation = useSumArray();
  const sumArrayResult = sumArrayMutation.data;

  return (
    <Card
      variant="nested"
      className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200"
    >
      <CardHeader>
        <h3 className="font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-blue-400 font-mono text-sm">POST</span>
          <span className="text-gray-400 text-sm">
            /api/v1/engine/sum-array
          </span>
        </h3>
      </CardHeader>
      <CardContent>
        <SumArrayForm />
        {sumArrayResult && (
          <Card variant="result" className="mt-3">
            <CardContent className="p-3">
              <div className="font-semibold text-sm">
                Result: {sumArrayResult.result}
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {sumArrayResult.message}
              </div>
            </CardContent>
          </Card>
        )}
        {sumArrayMutation.isError && (
          <Alert variant="destructive" className="mt-3">
            <AlertDescription>
              Error: {sumArrayMutation.error?.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
