interface Stats {
  todayCount: number;
  monthlyCount: number;
  successRate: number;
}

interface Props {
  stats: Stats;
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">오늘 발송</h3>
        <p className="mt-2 text-3xl font-semibold">{stats.todayCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">이번 달 발송</h3>
        <p className="mt-2 text-3xl font-semibold">{stats.monthlyCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">성공률</h3>
        <p className="mt-2 text-3xl font-semibold">
          {stats.successRate.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
