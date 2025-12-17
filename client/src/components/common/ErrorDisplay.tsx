interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 border-l-4 border-red-500 text-red-300 px-5 py-4 rounded-lg shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        <p className="font-medium">{error}</p>
      </div>
    </div>
  );
}
