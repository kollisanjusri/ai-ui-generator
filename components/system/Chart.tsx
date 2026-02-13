type ChartData = {
  label: string;
  value: number;
};

type ChartProps = {
  data: ChartData[];
  title?: string;
};

export function Chart({ data, title = "Chart" }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-blue-600 h-3 rounded"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
