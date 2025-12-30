"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { Plus, Loader2 } from "lucide-react";
import { addNumbers } from "../../services/engine";
import z from "zod";
import { useThrottledIsFetching } from "@/lib/tanstackPacer/useThrottledIsFetching";

const addSchema = z.object({
  a: z.number().min(-Infinity, "Number a is required"),
  b: z.number().min(-Infinity, "Number b is required"),
});

export function AddForm() {
  const form = useForm({
    resolver: zodResolver(addSchema),
    defaultValues: { a: 0, b: 0 },
  });

  const handleSubmit = async (data: z.infer<typeof addSchema>) => {
    await addNumbers(data);
  };

  const isSubmitting =
    useThrottledIsFetching(form.formState.isSubmitting) &&
    form.formState.isValid;

  return (
    <div className="rounded-lg border p-3 transition-all">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md">
              <Plus className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-sm font-semibold">Addition</h4>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Controller
                name="a"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Input
                      type="number"
                      placeholder="a"
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
            </div>

            <Plus className="h-4 w-4 mb-2 shrink-0" />

            <div className="flex-1">
              <Controller
                name="b"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Input
                      type="number"
                      placeholder="b"
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
            </div>

            <Button
              type="submit"
              variant="gradient-blue"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
