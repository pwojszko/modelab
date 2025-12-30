import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const cardVariants = cva(
  "group relative overflow-hidden rounded-xl bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      color: {
        blue: "hover:border-blue-500/30 hover:shadow-blue-500/10",
        purple: "hover:border-purple-500/30 hover:shadow-purple-500/10",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

const gradientVariants = cva(
  "absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  {
    variants: {
      color: {
        blue: "from-blue-500/0 via-blue-500/5 to-purple-500/0",
        purple: "from-purple-500/0 via-purple-500/5 to-blue-500/0",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

const iconVariants = cva(
  "w-10 h-10 rounded-lg bg-linear-to-br flex items-center justify-center border",
  {
    variants: {
      color: {
        blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
        purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  }
);

export interface StatusCardProps extends VariantProps<typeof cardVariants> {
  icon: string;
  label: string;
  title: string;
  state: "success" | "error";
  timestamp: Date;
}

export function StatusCard({
  icon,
  label,
  title,
  color,
  state,
  timestamp,
}: StatusCardProps) {
  return (
    <div className={cn(cardVariants({ color }))}>
      <div className={cn(gradientVariants({ color }))}></div>
      <div className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(iconVariants({ color }))}>
              <span className="text-lg">{icon}</span>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-gray-200">{title}</div>
            </div>
          </div>
          <Badge
            variant={state === "success" ? "successOutline" : "errorOutline"}
          >
            {state === "success" ? "Online" : "Offline"}{" "}
            {timestamp.toLocaleString()}
          </Badge>
        </div>
      </div>
    </div>
  );
}
