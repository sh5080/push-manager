export function PushHistoryTable({ history }: { history: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              발송일시
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              발송건수
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              성공률
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((item) => (
            <tr key={item.QUEUEIDX}>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.SENDDATE).toLocaleString()}
              </td>
              <td className="px-6 py-4">{item.MSGTITLE}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.STEP === "C"
                      ? "bg-green-100 text-green-800"
                      : item.STEP === "F"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.STEP === "C"
                    ? "완료"
                    : item.STEP === "F"
                    ? "실패"
                    : "진행중"}
                </span>
              </td>
              <td className="px-6 py-4">{item.TOTAL_COUNT}</td>
              <td className="px-6 py-4">
                {((item.SUCCESS_COUNT / item.TOTAL_COUNT) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
