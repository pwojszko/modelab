import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { factorialSchema, type FactorialFormData } from "@/lib/schemas";
import { useCalculateFactorial } from "@/features/engine/hooks/useEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { FunctionSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-3 backdrop-blur-sm transition-all hover:border-gray-600/50 hover:bg-gray-800/40">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              <FunctionSquare className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-200">Factorial</h4>
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
                      className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-colors h-9 text-sm"
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
              disabled={factorialMutation.throttledIsPending}
              className={cn(
                "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium shadow-lg shadow-emerald-500/20 transition-all h-9 px-4",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {factorialMutation.throttledIsPending ? (
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
