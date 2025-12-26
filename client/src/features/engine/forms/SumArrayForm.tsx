import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sumArraySchema, type SumArrayFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { useSumArray } from "@/features/engine/hooks/useEngine";
import { Sigma, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SumArrayForm() {
  const form = useForm<SumArrayFormData>({
    resolver: zodResolver(sumArraySchema),
    defaultValues: { numbers: "" },
  });

  const sumArrayMutation = useSumArray();

  const numbersValue = form.watch("numbers");
  const parsedNumbers = numbersValue
    ? numbersValue
        .split(",")
        .map((n) => n.trim())
        .filter((n) => n !== "")
        .map(Number)
        .filter((n) => !isNaN(n))
    : [];

  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-3 backdrop-blur-sm transition-all hover:border-gray-600/50 hover:bg-gray-800/40">
      <form
        onSubmit={form.handleSubmit((data) =>
          sumArrayMutation.mutate({
            numbers: data.numbers.split(",").map(Number),
          })
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
              <Sigma className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-200">Array Sum</h4>
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
                      className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-colors h-9 text-sm"
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
              disabled={
                sumArrayMutation.throttledIsPending ||
                parsedNumbers.length === 0
              }
              className={cn(
                "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all h-9 px-4",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {sumArrayMutation.throttledIsPending ? (
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
