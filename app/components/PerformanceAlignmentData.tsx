export default function KetegaklurusanTable({ performanceDataKetegaklurusan }: { performanceDataKetegaklurusan: { x: string; y: string }[] }) {
    if (
      !performanceDataKetegaklurusan ||
      performanceDataKetegaklurusan.length === 0
    ) {
      return (
        <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-md">
          No data available
        </div>
      );
    }

    return (
    <div className="overflow-x-auto">
      <table className="min-w-max border-collapse border border-gray-300 text-sm text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">Tanggal Uji</th>
            {performanceDataKetegaklurusan.map((d, i) => (
              <th key={i} className="border border-gray-300 px-3 py-2">
                {d.x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 font-semibold px-3 py-2">
              Ketegaklurusan
            </td>
            {performanceDataKetegaklurusan.map((d, i) => (
              <td key={i} className="border border-gray-300 px-3 py-2">
                {d.y}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
