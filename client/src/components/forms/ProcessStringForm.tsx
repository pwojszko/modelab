import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { processStringSchema, type ProcessStringFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { useProcessString } from "@/hooks/useEngine";

export function ProcessStringForm() {
  const form = useForm<ProcessStringFormData>({
    resolver: zodResolver(processStringSchema),
    defaultValues: { text: "" },
  });

  const processStringMutation = useProcessString();

  return (
    <form
      onSubmit={form.handleSubmit((data) => processStringMutation.mutate(data))}
    >
      <FieldGroup className="space-y-3">
        <Field>
          <FieldLabel>Text to process</FieldLabel>
          <FieldContent>
            <Controller
              name="text"
              control={form.control}
              render={({ field }) => (
                <>
                  <Input type="text" placeholder="Text to process" {...field} />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.text?.message,
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
          disabled={processStringMutation.isPending}
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
      </FieldGroup>
    </form>
  );
}
