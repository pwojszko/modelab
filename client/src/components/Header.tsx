import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ErrorDisplay } from "./common/ErrorDisplay";

interface HeaderProps {
  error: string | null;
}

export function Header({ error }: HeaderProps) {
  return (
    <Card variant="dark" className="p-8 md:p-10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              ModelSLab API Client
            </h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg mb-6 ml-1">
          Interactive interface for all server endpoints
        </p>
      </CardHeader>
      <CardContent>
        <ErrorDisplay error={error} />
      </CardContent>
    </Card>
  );
}
