"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { FunctionSquare, Loader2 } from "lucide-react";
import { calculateFactorial } from "../../services/engine";
import { useThrottledIsFetching } from "@/lib/tanstackPacer/useThrottledIsFetching";
import z from "zod";

const factorialSchema = z.object({
  n: z
    .number()
    .int("Must be an integer")
    .min(0, "Must be between 0 and 20")
    .max(20, "Must be between 0 and 20"),
});

export function FactorialForm() {
  const form = useForm({
    resolver: zodResolver(factorialSchema),
    defaultValues: { n: 0 },
  });

  const handleSubmit = async (data: z.infer<typeof factorialSchema>) => {
    await calculateFactorial(data);
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
              <FunctionSquare className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-sm font-semibold">Factorial</h4>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Controller
                name="n"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Input
                      type="number"
                      placeholder="n (0-20)"
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
            </div>
            <Button
              type="submit"
              variant="gradient-emerald"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <FunctionSquare className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
