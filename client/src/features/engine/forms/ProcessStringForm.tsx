import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { processStringSchema, type ProcessStringFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { useProcessString } from "@/features/engine/hooks/useEngine";
import { Type, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProcessStringForm() {
  const form = useForm<ProcessStringFormData>({
    resolver: zodResolver(processStringSchema),
    defaultValues: { text: "" },
  });

  const processStringMutation = useProcessString();

  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-3 backdrop-blur-sm transition-all hover:border-gray-600/50 hover:bg-gray-800/40">
      <form
        onSubmit={form.handleSubmit((data) =>
          processStringMutation.mutate(data)
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
              <Type className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-200">
              String Processing
            </h4>
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
                      className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors h-9 text-sm"
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
              disabled={processStringMutation.throttledIsPending}
              className={cn(
                "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium shadow-lg shadow-cyan-500/20 transition-all h-9 px-4",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {processStringMutation.throttledIsPending ? (
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
