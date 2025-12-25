import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { factorialSchema, type FactorialFormData } from "@/lib/schemas";
import { useCalculateFactorial } from "@/hooks/useEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";

export function FactorialForm() {
  const form = useForm<FactorialFormData>({
    resolver: zodResolver(factorialSchema),
    defaultValues: { n: 0 },
  });

  const factorialMutation = useCalculateFactorial();

  const handleSubmit = (data: FactorialFormData) => {
    factorialMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="space-y-3">
        <Field>
          <FieldLabel>Number n (0-20)</FieldLabel>
          <FieldContent>
            <Controller
              name="n"
              control={form.control}
              render={({ field }) => (
                <>
                  <Input
                    type="number"
                    placeholder="Number n (0-20)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                    min="0"
                    max="20"
                  />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.n?.message,
                      },
                    ]}
                  />
                </>
              )}
            />
          </FieldContent>
        </Field>
        <Button type="submit" disabled={factorialMutation.isPending} className="w-full">
          {factorialMutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Calculating...
            </span>
          ) : (
            "Calculate Factorial"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
