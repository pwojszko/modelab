export function PumpStatusDisplay() {
  return (
    <div className="min-w-[180px] p-8">
      <div className="flex items-center gap-3">
        <div className="relative">
          <span className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50 block" />
          <span className="absolute inset-0 w-4 h-4 rounded-full bg-emerald-400 animate-ping opacity-75" />
        </div>
        <div className="flex-1">
          <div className="text-2xl font-bold text-emerald-400 drop-shadow-lg">
            Running
          </div>
          <div className="text-xs text-emerald-300/80 mt-0.5">
            All systems operational
          </div>
        </div>
      </div>
    </div>
  );
}
