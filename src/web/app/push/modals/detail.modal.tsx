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
import { getMessageStatusStyle } from "app/utils/chip/pushResult/style.util";
import { getMessageStatusText } from "app/utils/chip/pushResult/text.util";
import { PushStats } from "../detail/pushStats.component";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { IPushStsMsgWithDetail } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { Button } from "@commonComponents/inputs/button.component";
import { Section } from "@commonComponents/dataDisplay/section.component";
import { ContentViewer } from "@commonComponents/dataDisplay/contentViewer.component";

interface DetailModalProps {
  push: IPushStsMsgWithDetail | null;
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
                <Section title="기본 정보">
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
                          {formatDate(formatDateToString(push.sendDate))}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          상태
                        </p>
                        <span
                          className={`
                        mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${getMessageStatusStyle(push.step)}
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
                      <ContentViewer
                        buttonText="더보기"
                        title="내용 전체보기"
                        content={push.tmpMessage!}
                        maxLength={200}
                      />
                    </div>
                  </div>
                </Section>

                {push.detail && push.result ? (
                  <Section title="발송 결과">
                    <PushStats
                      detail={push.detail}
                      result={push.result}
                      openinfo={push.openinfo}
                    />
                  </Section>
                ) : (
                  <Section title="오류">
                    <p>데이터 불러오기에 실패했습니다. 다시 시도해주세요.</p>
                  </Section>
                )}

                <div className="mt-6 flex justify-end">
                  <Button onClick={onClose} variant="square-line">
                    닫기
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
