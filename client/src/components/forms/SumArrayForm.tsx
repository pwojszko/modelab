import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sumArraySchema, type SumArrayFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { useSumArray } from "@/hooks/useEngine";

export function SumArrayForm() {
  const form = useForm<SumArrayFormData>({
    resolver: zodResolver(sumArraySchema),
    defaultValues: { numbers: "" },
  });

  const sumArrayMutation = useSumArray();

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        sumArrayMutation.mutate({
          numbers: data.numbers.split(",").map(Number),
        })
      )}
    >
      <FieldGroup className="space-y-3">
        <Field>
          <FieldLabel>Numbers (comma-separated)</FieldLabel>
          <FieldContent>
            <Controller
              name="numbers"
              control={form.control}
              render={({ field }) => (
                <>
                  <Input
                    type="text"
                    placeholder="Numbers (comma-separated)"
                    {...field}
                  />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.numbers?.message,
                      },
                    ]}
                  />
                </>
              )}
            />
          </FieldContent>
        </Field>
        <Button
          type="submit"
          disabled={sumArrayMutation.isPending}
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
      </FieldGroup>
    </form>
  );
}
