import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import {
  useEngineStatus,
  useAddNumbers,
  useMultiplyNumbers,
  useCalculateFactorial,
  useProcessString,
  useSumArray,
  engineKeys,
} from "../hooks/useEngine";
import type {
  AddRequest,
  MultiplyRequest,
  FactorialRequest,
  ProcessStringRequest,
} from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EngineEndpoints() {
  const queryClient = useQueryClient();

  // Queries
  const engineStatusQuery = useEngineStatus();

  // Mutations
  const addMutation = useAddNumbers();
  const multiplyMutation = useMultiplyNumbers();
  const factorialMutation = useCalculateFactorial();
  const processStringMutation = useProcessString();
  const sumArrayMutation = useSumArray();

  // Forms
  const addForm = useForm({
    defaultValues: {
      a: 0,
      b: 0,
    } as AddRequest,
    onSubmit: async ({ value }) => {
      addMutation.mutate(value);
    },
  });

  const multiplyForm = useForm({
    defaultValues: {
      a: 0,
      b: 0,
    } as MultiplyRequest,
    onSubmit: async ({ value }) => {
      multiplyMutation.mutate(value);
    },
  });

  const factorialForm = useForm({
    defaultValues: {
      n: 0,
    } as FactorialRequest,
    onSubmit: async ({ value }) => {
      factorialMutation.mutate(value);
    },
  });

  const stringForm = useForm({
    defaultValues: {
      text: "",
    } as ProcessStringRequest,
    onSubmit: async ({ value }) => {
      processStringMutation.mutate(value);
    },
  });

  const arrayForm = useForm({
    defaultValues: {
      numbers: "",
    } as { numbers: string },
    onSubmit: async ({ value }) => {
      const numbers = value.numbers
        .split(",")
        .map((n) => parseFloat(n.trim()))
        .filter((n) => !isNaN(n));
      sumArrayMutation.mutate({ numbers });
    },
  });

  // Get cached results
  const addResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("add"));
  const multiplyResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("multiply"));
  const factorialResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("factorial"));
  const processStringResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("processString"));
  const sumArrayResult = queryClient.getQueryData<{
    result: number | string | null;
    message: string;
  }>(engineKeys.result("sumArray"));

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
          {/* Engine Status */}
          <Card variant="nested" className="p-5 hover:border-green-500 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-green-400 font-mono text-sm">GET</span>
                <span className="text-gray-400 text-sm">
                  /api/v1/engine/status
                </span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => engineStatusQuery.refetch()}
                disabled={engineStatusQuery.isFetching}
                variant="secondary"
                className="w-full"
              >
                {engineStatusQuery.isFetching ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Loading...
                  </span>
                ) : (
                  "Check Status"
                )}
              </Button>
              {engineStatusQuery.data && (
                <Alert
                  variant={
                    engineStatusQuery.data.success ? "default" : "destructive"
                  }
                >
                  <AlertDescription className="text-sm font-medium">
                    {engineStatusQuery.data.message}
                  </AlertDescription>
                </Alert>
              )}
              {engineStatusQuery.error && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Error: {engineStatusQuery.error.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

        {/* Add */}
        <Card variant="nested" className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">POST</span>
                <span className="text-gray-400 text-sm">
                  /api/v1/engine/add
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <addForm.Field name="a">
                  {(field) => (
                    <Input
                      type="number"
                      placeholder="Number a"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                  )}
                </addForm.Field>
                <addForm.Field name="b">
                  {(field) => (
                    <Input
                      type="number"
                      placeholder="Number b"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                  )}
                </addForm.Field>
                <addForm.Subscribe>
                  {({ canSubmit }) => (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          addForm.handleSubmit();
                        }}
                        disabled={!canSubmit || addMutation.isPending}
                        className="w-full"
                      >
                        {addMutation.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Calculating...
                          </span>
                        ) : (
                          "Add"
                        )}
                      </Button>
                    {addResult && (
                      <Card variant="result">
                        <CardContent className="p-3">
                            <div className="font-semibold text-sm">
                              Result: {addResult.result}
                            </div>
                            <div className="text-muted-foreground text-xs mt-1">
                              {addResult.message}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      {addMutation.isError && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            Error: {addMutation.error?.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </addForm.Subscribe>
              </div>
            </CardContent>
          </Card>

        {/* Multiply */}
        <Card variant="nested" className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">POST</span>
                <span className="text-gray-400 text-sm">
                  /api/v1/engine/multiply
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <multiplyForm.Field name="a">
                  {(field) => (
                    <Input
                      type="number"
                      placeholder="Number a"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                  )}
                </multiplyForm.Field>
                <multiplyForm.Field name="b">
                  {(field) => (
                    <Input
                      type="number"
                      placeholder="Number b"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                  )}
                </multiplyForm.Field>
                <multiplyForm.Subscribe>
                  {({ canSubmit }) => (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          multiplyForm.handleSubmit();
                        }}
                        disabled={!canSubmit || multiplyMutation.isPending}
                        className="w-full"
                      >
                        {multiplyMutation.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Calculating...
                          </span>
                        ) : (
                          "Multiply"
                        )}
                      </Button>
                    {multiplyResult && (
                      <Card variant="result">
                        <CardContent className="p-3">
                            <div className="font-semibold text-sm">
                              Result: {multiplyResult.result}
                            </div>
                            <div className="text-muted-foreground text-xs mt-1">
                              {multiplyResult.message}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      {multiplyMutation.isError && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            Error: {multiplyMutation.error?.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </multiplyForm.Subscribe>
              </div>
            </CardContent>
          </Card>

        {/* Factorial */}
        <Card variant="nested" className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">POST</span>
                <span className="text-gray-400 text-sm">
                  /api/v1/engine/factorial
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <factorialForm.Field name="n">
                  {(field) => (
                    <Input
                      type="number"
                      placeholder="Number n (0-20)"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                  )}
                </factorialForm.Field>
                <factorialForm.Subscribe>
                  {({ canSubmit }) => (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          factorialForm.handleSubmit();
                        }}
                        disabled={!canSubmit || factorialMutation.isPending}
                        className="w-full"
                      >
                        {factorialMutation.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Calculating...
                          </span>
                        ) : (
                          "Calculate Factorial"
                        )}
                      </Button>
                    {factorialResult && (
                      <Card variant="result">
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
                        <Alert variant="destructive">
                          <AlertDescription>
                            Error: {factorialMutation.error?.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </factorialForm.Subscribe>
              </div>
            </CardContent>
          </Card>

        {/* Process String */}
        <Card variant="nested" className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">POST</span>
                <span className="text-gray-400 text-sm">
                  /api/v1/engine/process-string
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <stringForm.Field name="text">
                  {(field) => (
                    <Input
                      type="text"
                      placeholder="Text to process"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  )}
                </stringForm.Field>
                <stringForm.Subscribe>
                  {({ canSubmit }) => (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          stringForm.handleSubmit();
                        }}
                        disabled={!canSubmit || processStringMutation.isPending}
                        className="w-full"
                      >
                        {processStringMutation.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Processing...
                          </span>
                        ) : (
                          "Process String"
                        )}
                      </Button>
                    {processStringResult && (
                      <Card variant="result">
                        <CardContent className="p-3">
                            <div className="font-semibold text-sm">
                              Result: {processStringResult.result}
                            </div>
                            <div className="text-muted-foreground text-xs mt-1">
                              {processStringResult.message}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      {processStringMutation.isError && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            Error: {processStringMutation.error?.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </stringForm.Subscribe>
              </div>
            </CardContent>
          </Card>

        {/* Sum Array */}
        <Card variant="nested" className="p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200">
            <CardHeader>
              <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">POST</span>
                <span className="text-gray-400 text-sm">
                  /api/v1/engine/sum-array
                </span>
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <arrayForm.Field name="numbers">
                  {(field) => (
                    <Input
                      type="text"
                      placeholder="Numbers (comma-separated)"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  )}
                </arrayForm.Field>
                <arrayForm.Subscribe>
                  {({ canSubmit }) => (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          arrayForm.handleSubmit();
                        }}
                        disabled={!canSubmit || sumArrayMutation.isPending}
                        className="w-full"
                      >
                        {sumArrayMutation.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span>
                            Calculating...
                          </span>
                        ) : (
                          "Sum Array"
                        )}
                      </Button>
                    {sumArrayResult && (
                      <Card variant="result">
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
                        <Alert variant="destructive">
                          <AlertDescription>
                            Error: {sumArrayMutation.error?.message}
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </arrayForm.Subscribe>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
