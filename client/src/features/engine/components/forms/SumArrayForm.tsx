"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { Sigma, Loader2 } from "lucide-react";
import { sumArray } from "../../services/engine";
import { useThrottledIsFetching } from "@/lib/tanstackPacer/useThrottledIsFetching";
import z from "zod";

const sumArraySchema = z.object({
  numbers: z.string().min(1, "Numbers are required"),
});

export function SumArrayForm() {
  const form = useForm({
    resolver: zodResolver(sumArraySchema),
    defaultValues: { numbers: "" },
  });

  const handleSubmit = async (data: z.infer<typeof sumArraySchema>) => {
    await sumArray({ numbers: data.numbers.split(",").map(Number) });
  };

  const isSubmitting =
    useThrottledIsFetching(form.formState.isSubmitting) &&
    form.formState.isValid;

  return (
    <div className="rounded-lg border p-3 transition-all">
      <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md">
              <Sigma className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-sm font-semibold">Array Sum</h4>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Controller
                name="numbers"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      placeholder="e.g., 1, 2, 3, 4, 5"
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
            </div>

            <Button
              type="submit"
              variant="gradient-indigo"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sigma className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
