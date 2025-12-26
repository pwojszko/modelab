import { StatusBadge } from "./StatusBadge";

export interface StatusCardProps {
  icon: string;
  label: string;
  title: string;
  color: "blue" | "purple";
  isLoading: boolean;
  isSuccess: boolean;
  loadingText: string;
  successText: string;
  errorText: string;
}

export function StatusCard({
  icon,
  label,
  title,
  color,
  isLoading,
  isSuccess,
  loadingText,
  successText,
  errorText,
}: StatusCardProps) {
  const colorClasses = {
    blue: {
      hoverBorder: "hover:border-blue-500/30",
      hoverShadow: "hover:shadow-blue-500/10",
      gradient: "from-blue-500/0 via-blue-500/5 to-purple-500/0",
      iconBg: "from-blue-500/20 to-blue-600/20",
      iconBorder: "border-blue-500/30",
    },
    purple: {
      hoverBorder: "hover:border-purple-500/30",
      hoverShadow: "hover:shadow-purple-500/10",
      gradient: "from-purple-500/0 via-purple-500/5 to-blue-500/0",
      iconBg: "from-purple-500/20 to-purple-600/20",
      iconBorder: "border-purple-500/30",
    },
  };

  const classes = colorClasses[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 ${classes.hoverBorder} transition-all duration-300 hover:shadow-lg ${classes.hoverShadow}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${classes.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
      <div className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${classes.iconBg} flex items-center justify-center border ${classes.iconBorder}`}
            >
              <span className="text-lg">{icon}</span>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-gray-200">{title}</div>
            </div>
          </div>
          <StatusBadge
            isLoading={isLoading}
            isSuccess={isSuccess}
            loadingText={loadingText}
            successText={successText}
            errorText={errorText}
          />
        </div>
      </div>
    </div>
  );
}
