"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";
import { formatDate } from "@push-manager/shared/utils/date";
import { PushAPI } from "app/apis/push.api";
import { Toast } from "app/utils/toast.util";

interface ScheduledPushDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  push: IPushMasterWithMsg;
}

export function ScheduledPushDetailModal({
  isOpen,
  onClose,
  push,
}: ScheduledPushDetailModalProps) {
  console.log(push);
  const handleConfirmSchedule = async () => {
    const toastId = Toast.loading("푸시 예약 확정 처리중...");

    try {
      const pushApi = PushAPI.getInstance();
      // TODO 예약 확정 업데이트 추가
      // await pushApi.confirmScheduledPush(push.cmpncode);
      Toast.update(toastId, "푸시 예약이 확정되었습니다.", "success");
      onClose();
    } catch (error) {
      console.error("푸시 예약 확정 실패:", error);
      Toast.update(
        toastId,
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.",
        "error"
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <DialogTitle className="text-lg font-semibold">
              푸시 예약 상세
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">제목</h3>
              <p className="mt-1">{push.title}</p>
            </div>

            {push.msgidx && (
              <div>
                <p className="text-sm text-gray-500 mt-1">
                  메시지 IDX: {push.msgidx}
                </p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500">내용</h3>
              <p className="mt-1 whitespace-pre-wrap">{push.message}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                발송 예정 시각
              </h3>
              <p className="mt-1">{formatDate(push.rstartDate)}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              닫기
            </button>
            {push.step === "R" && (
              <button
                onClick={handleConfirmSchedule}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                예약 확정하기
              </button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
