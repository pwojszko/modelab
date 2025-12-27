import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  isLoading: boolean;
  isSuccess: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
}

export function StatusBadge({
  isLoading,
  isSuccess,
  loadingText = "Loading...",
  successText = "Ready",
  errorText = "Unavailable",
}: StatusBadgeProps) {
  const variant = isLoading
    ? "secondary"
    : isSuccess
    ? "default"
    : "destructive";

  const dotColor = isLoading
    ? "bg-yellow-400 animate-pulse"
    : isSuccess
    ? "bg-emerald-400 animate-pulse"
    : "bg-red-400";

  const text = isLoading ? loadingText : isSuccess ? successText : errorText;

  return (
    <Badge variant={variant} className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      {text}
    </Badge>
  );
}
