import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { multiplySchema, type MultiplyFormData } from "@/lib/schemas";
import { useMultiplyNumbers } from "@/features/engine/hooks/useEngine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function MultiplyForm() {
  const form = useForm<MultiplyFormData>({
    resolver: zodResolver(multiplySchema),
    defaultValues: { a: 0, b: 0 },
  });

  const multiplyMutation = useMultiplyNumbers();

  const handleSubmit = (data: MultiplyFormData) => {
    multiplyMutation.mutate(data);
  };

  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 p-3 backdrop-blur-sm transition-all hover:border-gray-600/50 hover:bg-gray-800/40">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20">
              <X className="h-3.5 w-3.5 text-purple-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-200">
              Multiplication
            </h4>
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
                      className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-colors h-9 text-sm"
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
            <X className="h-4 w-4 text-gray-400 mb-2 flex-shrink-0" />
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
                      className="bg-gray-900/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-colors h-9 text-sm"
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
              disabled={multiplyMutation.throttledIsPending}
              className={cn(
                "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium shadow-lg shadow-purple-500/20 transition-all h-9 px-4",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {multiplyMutation.throttledIsPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
