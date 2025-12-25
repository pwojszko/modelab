import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSchema, type AddFormData } from "@/lib/schemas";
import { useAddNumbers } from "@/hooks/useEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";

export function AddForm() {
  const form = useForm<AddFormData>({
    resolver: zodResolver(addSchema),
    defaultValues: { a: 0, b: 0 },
  });

  const addMutation = useAddNumbers();

  const handleSubmit = (data: AddFormData) => {
    addMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="space-y-3">
        <Field>
          <FieldLabel>Number a</FieldLabel>
          <FieldContent>
            <Controller
              name="a"
              control={form.control}
              render={({ field }) => (
                <>
                  <Input
                    type="number"
                    placeholder="Number a"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.a?.message,
                      },
                    ]}
                  />
                </>
              )}
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Number b</FieldLabel>
          <FieldContent>
            <Controller
              name="b"
              control={form.control}
              render={({ field }) => (
                <>
                  <Input
                    type="number"
                    placeholder="Number b"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                  <FieldError
                    errors={[
                      {
                        message: form.formState.errors.b?.message,
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
          disabled={addMutation.isPending}
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
      </FieldGroup>
    </form>
  );
}
