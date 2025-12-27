import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        <AlertDescription className="font-medium">{error}</AlertDescription>
      </div>
    </Alert>
  );
}
