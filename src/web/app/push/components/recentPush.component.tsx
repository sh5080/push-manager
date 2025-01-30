"use client";

import { useEffect, useState } from "react";
import { pushApi } from "app/apis/push.api";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { DetailModal } from "../modals/detail.modal";
import { PushResultTable } from "./pushResultTable.component";
import { Toast } from "app/utils/toast.util";

export function RecentPushes() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [selectedPush, setSelectedPush] = useState<IPushStsMsg | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPushes = async () => {
    try {
      const data = await pushApi.getRecentPushes({
        limit: 5,
        targetMode: AppIdEnum.PROD,
      });
      setPushes(data);
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  const handlePushClick = async (push: IPushStsMsg) => {
    try {
      const detailData = await pushApi.getPushDetail(push.idx);
      setSelectedPush(detailData);
      setIsModalOpen(true);
    } catch (e) {
      console.error("Failed to fetch push detail:", e);
    }
  };

  useEffect(() => {
    fetchPushes();
  }, []);

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

      <PushResultTable
        pushes={pushes.map((push) => ({
          type: "message",
          title: push.title!,
          rstartDate: push.senddate!,
          step: push.step!,
          ...push,
        }))}
        onPushSelect={handlePushClick}
        onRefresh={fetchPushes}
      />

      <DetailModal
        push={selectedPush}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
