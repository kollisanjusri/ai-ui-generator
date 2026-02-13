type TableProps = {
  columns?: string[];
  data?: Record<string, string | number>[];
};

export function Table({ columns = [], data = [] }: TableProps) {
  if (!columns.length || !data.length) {
    return (
      <div className="p-4 border border-red-300 rounded bg-red-50 text-sm">
        Invalid Table: missing columns or data
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-sm font-semibold border-b border-gray-200"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-4 py-2 text-sm border-b border-gray-200"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
