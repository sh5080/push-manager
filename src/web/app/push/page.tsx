"use client";

import { useState } from "react";
import { PageHeader } from "../common/components/pageHeader.component";
import { RecentPushes } from "./components/recentPush.component";
import { SendPushModal } from "./modals/sendPush.modal";
import { Button } from "app/common/components/button.component";

export default function PushPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <Button
                variant="solid"
                size="38"
                onClick={() => setIsModalOpen(true)}
              >
                타겟 푸시 발송
              </Button>
            </>
          }
        />

        <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <RecentPushes />
        </div>

        <SendPushModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
