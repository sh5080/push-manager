"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { Toast } from "app/utils/toast.util";
import { useState } from "react";
import { PushReservationStatusModal } from "./pushReservationStatus.modal";
import { pushApi } from "app/apis/push.api";
import { Button } from "@commonComponents/inputs/button.component";

import { ConfirmPushQueueDto } from "@push-manager/shared/dtos/push.dto";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

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
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleConfirmSchedule = async () => {
    const toastId = Toast.loading("푸시 예약 확정 처리중...");

    try {
      const dto: ConfirmPushQueueDto = {
        campaignCode: Number(push.cmpncode),
        step: StepEnum.TRANSACTION,
      };

      const data = await pushApi.confirmScheduledPush(dto);
      if (data.step === StepEnum.TRANSACTION) {
        Toast.update(toastId, "푸시 예약이 확정되었습니다.", "success");
      }
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

  const handleDeleteSchedule = async () => {
    const toastId = Toast.loading("푸시 예약 삭제 처리중...");
    try {
      await pushApi.deleteQueue(Number(push.cmpncode));
      Toast.update(toastId, "푸시 예약이 삭제되었습니다.", "success");
      onClose();
    } catch (error) {
      console.error("푸시 예약 삭제 실패:", error);
      Toast.update(
        toastId,
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.",
        "error"
      );
    }
  };

  const handleCheckStatus = () => {
    setIsStatusModalOpen(true);
  };

  return (
    <>
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

              {push.msgIdx && (
                <div>
                  <p className="text-sm text-gray-500 mt-1">
                    메시지 IDX: {push.msgIdx}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">내용</h3>
                <p className="mt-1 whitespace-pre-wrap">{push.message}</p>
              </div>

              <div className="flex items-center gap-4">
                <h3 className="text-sm font-medium text-gray-500 w-24">
                  발송 예정 시각
                </h3>
                <p>{formatDate(push.rStartDate)}</p>
              </div>

              {push.step !== StepEnum.COMPLETED && (
                <div className="flex justify-end">
                  <Button onClick={handleCheckStatus} variant="square-green">
                    예약 상태 확인
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <Button onClick={onClose} variant="square-line">
                닫기
              </Button>
              {push.step === "R" && (
                <>
                  <Button onClick={handleDeleteSchedule} variant="square-red">
                    발송 대기 삭제
                  </Button>
                  <Button onClick={handleConfirmSchedule} variant="square-solid">
                  발송 요청하기
                  </Button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <PushReservationStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        cmpncode={Number(push.cmpncode)}
      />
    </>
  );
}
