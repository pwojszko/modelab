"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { Type, Loader2 } from "lucide-react";
import { processString } from "../../services/engine";
import { useThrottledIsFetching } from "@/lib/tanstackPacer/useThrottledIsFetching";
import z from "zod";

const processStringSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

export function ProcessStringForm() {
  const form = useForm({
    resolver: zodResolver(processStringSchema),
    defaultValues: { text: "" },
  });

  const handleSubmit = async (data: z.infer<typeof processStringSchema>) => {
    await processString(data);
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
              <Type className="h-3.5 w-3.5" />
            </div>
            <h4 className="text-sm font-semibold">String Processing</h4>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Controller
                name="text"
                control={form.control}
                render={({ field }) => (
                  <>
                    <Input
                      type="text"
                      placeholder="Enter text to process"
                      {...field}
                    />
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
            </div>
            <Button
              type="submit"
              variant="gradient-cyan"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Type className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
