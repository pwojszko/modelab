interface JsonDisplayProps {
  data: any;
}

export function JsonDisplay({ data }: JsonDisplayProps) {
  return (
    <div className="mt-3 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-inner">
      <pre className="text-xs md:text-sm overflow-auto text-gray-200 font-mono leading-relaxed">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
