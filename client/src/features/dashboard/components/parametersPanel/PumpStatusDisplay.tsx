import { Separator } from "@/components/ui/separator";

export function PumpStatusDisplay() {
  return (
    <div className="pt-4">
      <Separator className="mb-4" />
      <div className="flex items-center justify-between mb-3 p-3 bg-muted rounded-xl">
        <span className="text-sm font-medium">Status:</span>
        <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Running
        </span>
      </div>
      <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
        <span className="text-sm font-medium">Temperature:</span>
        <span className="text-sm font-bold text-blue-400">42°C</span>
      </div>
    </div>
  );
}
