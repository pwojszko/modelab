interface JsonDisplayProps {
  data: any;
}

export function JsonDisplay({ data }: JsonDisplayProps) {
  return (
    <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto text-gray-800">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
