"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  CreateButton,
} from "../common/components/pageHeader.component";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import LoadingSpinner from "app/common/components/spinner.component";
import { RecentPushes } from "./components/recentPush.component";
import { SendPushModal } from "./modals/sendPush.modal";

export default function PushPage() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [selectedPush, setSelectedPush] = useState<IPushStsMsg | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPushes();
  }, []);

  const fetchPushes = async () => {
    try {
      const response = await fetch("/api/push");
      const data = await response.json();
      setPushes(data);
    } catch (error) {
      console.error("Failed to fetch pushes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="푸시 알림 관리"
          description={
            <span className="whitespace-pre-line">
              타겟 푸시 알림을 생성하고 발송 현황을 관리할 수 있습니다.{"\n"}
              전체푸시는 기존 핑거푸시 콘솔을 사용해주세요.
            </span>
          }
          actions={
            <>
              <CreateButton
                text="타겟 푸시 발송"
                onClick={() => setIsModalOpen(true)}
              />
            </>
          }
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <RecentPushes />
          </div>
        )}

        <SendPushModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
