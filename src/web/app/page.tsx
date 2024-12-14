import Link from "next/link";
import { pushController } from "@/server/controllers/pushController";

export default async function DashboardPage() {
  const pushService = pushController.getPushService();
  // const recentPushes = await pushService.getRecentPushes(5);
  // const stats = await pushService.getPushStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">푸시 매니저</h1>
          <p className="mt-2 text-sm text-gray-600">
            푸시 메시지 발송 및 관리 시스템
          </p>
        </div>

        {/* 퀵 액션 버튼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/push/target/send"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              타겟 푸시 발송
            </h2>
            <p className="text-gray-600">
              특정 사용자 그룹에게 푸시 메시지를 발송합니다.
            </p>
          </Link>
          <Link
            href="/push/all/send"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              전체 푸시 발송
            </h2>
            <p className="text-gray-600">
              전체 사용자에게 푸시 메시지를 발송합니다.
            </p>
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              오늘 발송된 메시지
            </h3>
            {/* <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stats.todayCount}
            </p> */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">전체 성공률</h3>
            {/* <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stats.successRate}%
            </p> */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              이번 달 총 발송
            </h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {/* {stats.monthlyCount} */}
            </p>
          </div>
        </div>

        {/* 최근 발송 이력 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              최근 발송 이력
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    발송일시
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    발송건수
                  </th>
                </tr>
              </thead>
              {/* <tbody className="bg-white divide-y divide-gray-200">
                {recentPushes.map((push) => (
                  <tr key={push.QUEUEIDX} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(push.SENDDATE).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {push.PMODE === "CAMP" ? "타겟" : "전체"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {push.MSGTITLE}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          push.STEP === "C"
                            ? "bg-green-100 text-green-800"
                            : push.STEP === "F"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {push.STEP === "C"
                          ? "완료"
                          : push.STEP === "F"
                          ? "실패"
                          : "진행중"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {push.TOTAL_COUNT}
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/push/history"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              전체 이력 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
