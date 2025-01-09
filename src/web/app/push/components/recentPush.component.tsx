"use client";

import { useEffect, useState } from "react";
import { PushAPI } from "app/apis/push.api";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import ErrorFallback from "app/common/components/errorFallback.component";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import {
  getStatusStyle,
  getStatusText,
  formatDate,
} from "../../utils/push.util";
import { DetailModal } from "../modals/detail.modal";

export function RecentPushes() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPush, setSelectedPush] = useState<IPushStsMsg | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPushes = async () => {
    try {
      setError(null);
      const pushAPI = PushAPI.getInstance();
      const data = await pushAPI.getRecentPushes({
        limit: 5,
        targetMode: AppIdEnum.PROD,
      });
      setPushes(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to fetch pushes"));
    }
  };

  const handlePushClick = async (push: IPushStsMsg) => {
    try {
      const pushAPI = PushAPI.getInstance();
      const detailData = await pushAPI.getPushDetail(push.idx);
      setSelectedPush(detailData);
      setIsModalOpen(true);
    } catch (e) {
      console.error("Failed to fetch push detail:", e);
    }
  };

  useEffect(() => {
    fetchPushes();
  }, []);

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={fetchPushes} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              최근 푸시 알림
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              최근 발송된 푸시 알림 목록입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                발송자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                발송일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pushes.map((push) => (
              <tr
                key={push.idx}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handlePushClick(push)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {push.userId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(push.senddate)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-md">
                    {push.title || "오류"}
                  </div>
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

      {pushes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            최근 발송된 푸시 알림이 없습니다.
          </p>
        </div>
      )}

      <DetailModal
        push={selectedPush}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
