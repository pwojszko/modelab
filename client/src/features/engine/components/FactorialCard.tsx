import { useCalculateFactorial } from "../hooks/useEngine";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FactorialForm } from "@/features/engine/forms/FactorialForm";

export function FactorialCard() {
  const factorialMutation = useCalculateFactorial();
  const factorialResult = factorialMutation.data;

  return (
    <Card
      variant="nested"
      className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200"
    >
      <CardHeader>
        <h3 className="font-semibold text-gray-200 flex items-center gap-2">
          <span className="text-blue-400 font-mono text-sm">POST</span>
          <span className="text-gray-400 text-sm">
            /api/v1/engine/factorial
          </span>
        </h3>
      </CardHeader>
      <CardContent>
        <FactorialForm />
        {factorialResult && (
          <Card variant="result" className="mt-3">
            <CardContent className="p-3">
              <div className="font-semibold text-sm">
                Result: {factorialResult.result}
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {factorialResult.message}
              </div>
            </CardContent>
          </Card>
        )}
        {factorialMutation.isError && (
          <Alert variant="destructive" className="mt-3">
            <AlertDescription>
              Error: {factorialMutation.error?.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
