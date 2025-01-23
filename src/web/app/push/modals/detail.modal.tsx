"use client";

import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { formatDateToString } from "../../utils/push.util";
import { getStatusStyle, getMessageStatusText } from "../../utils/chip.util";
import { PushStats } from "../components/PushStats.component";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { IPushStsMsg } from "@push-manager/shared";

interface DetailModalProps {
  push: IPushStsMsg | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailModal({ push, isOpen, onClose }: DetailModalProps) {
  if (!push) return null;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                      푸시 알림 상세 정보
                    </DialogTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      메시지 IDX: {push.idx}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        발송자
                      </p>
                      <p className="mt-1">{push.userId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        발송일
                      </p>
                      <p className="mt-1">
                        {formatDate(formatDateToString(push.senddate))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">상태</p>
                      <span
                        className={`
                        mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${getStatusStyle(push.step)}
                      `}
                      >
                        {getMessageStatusText(push.step)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">제목</p>
                    <p className="mt-1">{push.title}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">내용</p>
                    <p className="mt-1 whitespace-pre-wrap">
                      {push.tmpMessage}
                    </p>
                  </div>
                  {push.detail && <PushStats detail={push.detail} />}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                    onClick={onClose}
                  >
                    닫기
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
