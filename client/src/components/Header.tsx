import { ErrorDisplay } from "./common/ErrorDisplay";

interface HeaderProps {
  error: string | null;
}

export function Header({ error }: HeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        ModelSLab API Client
      </h1>
      <p className="text-gray-600 mb-4">
        Interactive interface for all server endpoints
      </p>
      <ErrorDisplay error={error} />
    </div>
  );
}
