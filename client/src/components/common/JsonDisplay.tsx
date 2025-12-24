import { Card, CardContent } from "@/components/ui/card";

interface JsonDisplayProps {
  data: any;
}

export function JsonDisplay({ data }: JsonDisplayProps) {
  return (
    <Card variant="nested" className="mt-3">
      <CardContent className="p-4">
        <pre className="text-xs md:text-sm overflow-auto text-muted-foreground font-mono leading-relaxed">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
