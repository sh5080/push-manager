"use client";

import { useEffect, useState } from "react";
import { PushAPI } from "../../apis/push.api";
import { formatDate } from "@push-manager/shared/utils/date";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";
import { getStatusStyle, getStatusText } from "app/utils/push.util";

export default function ScheduledPushPage() {
  const [scheduledPushes, setScheduledPushes] = useState<IPushMasterWithMsg[]>(
    []
  );

  useEffect(() => {
    const fetchScheduledPushes = async () => {
      try {
        const pushApi = PushAPI.getInstance();
        const pushes = await pushApi.getScheduledPushes();
        setScheduledPushes(pushes);
      } catch (error) {
        console.error("예약된 푸시 조회 실패:", error);
      }
    };

    fetchScheduledPushes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">푸시 예약 조회</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                캠페인 코드
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                발송 예정 시각
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduledPushes.map((push) => (
              <tr key={push.cmpncode}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.cmpncode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.pushStsMsg ? push.pushStsMsg.title : "제목 없음"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(push.rStartDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`
                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                    ${getStatusStyle(push.step)}
                  `}
                  >
                    {getStatusText(push.step)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
