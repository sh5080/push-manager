import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Section } from "app/common/components/detail/section.component";
import { DetailItem } from "app/common/components/detail/detailItem.component";
import {
  getStepColorStyle,
  getSendStatColorStyle,
} from "app/utils/chip/pushResult/style.util";
import { HiX } from "react-icons/hi";

interface PushDetailProps {
  push: IPushStsMsg;
  onClose: () => void;
}

export function PushDetail({ push, onClose }: PushDetailProps) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
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
              <DialogPanel className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-800">
                    푸시 상세 정보1
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <Section title="기본 정보">
                    <DetailItem label="IDX" value={push.idx} bold />
                    <DetailItem label="제목" value={push.title} />
                    <DetailItem
                      label="메시지"
                      value={push.tmpMessage}
                      className="whitespace-pre-line"
                    />
                    <DetailItem label="발송자" value={push.userId} />
                    <DetailItem label="앱 ID" value={push.appid} />
                  </Section>

                  <Section title="시간 정보">
                    <DetailItem
                      label="발송 시간"
                      value={push.senddate}
                      isDate
                    />
                    <DetailItem
                      label="결과 시간"
                      value={push.resultdate}
                      isDate
                    />
                    <DetailItem
                      label="Cron 시간"
                      value={push.crondate}
                      isDate
                    />
                    <DetailItem
                      label="Cron 완료 시간"
                      value={push.cronComplatedate}
                      isDate
                    />
                    <DetailItem label="생성 시간" value={push.wdate} isDate />
                    <DetailItem label="수정 시간" value={push.udate} isDate />
                  </Section>

                  <Section title="상태 정보">
                    <DetailItem
                      label="단계"
                      value={push.step}
                      badge
                      badgeColor={getStepColorStyle(push.step)}
                    />
                    <DetailItem
                      label="발송 상태"
                      value={push.sendStat}
                      badge
                      badgeColor={getSendStatColorStyle(push.sendStat)}
                    />
                    <DetailItem label="재시도 횟수" value={push.retry} />
                    <DetailItem label="발송 속도" value={push.sendspeed} />
                  </Section>

                  <Section title="플랫폼 정보">
                    <DetailItem
                      label="Android 지원"
                      value={push.isandroid}
                      isBoolean
                    />
                    <DetailItem label="iOS 지원" value={push.isios} isBoolean />
                    <DetailItem
                      label="Android 발송 수"
                      value={push.andSendCount}
                    />
                    <DetailItem label="iOS 발송 수" value={push.iosSendCount} />
                    <DetailItem
                      label="Android 우선순위"
                      value={push.andPriority}
                    />
                  </Section>

                  <Section title="알림 설정">
                    <DetailItem
                      label="Android 소리"
                      value={push.androidSound}
                    />
                    <DetailItem
                      label="Android 뱃지"
                      value={push.androidBadge}
                    />
                    <DetailItem label="iOS 소리" value={push.iosSound} />
                    <DetailItem label="iOS 뱃지" value={push.iosBadge} />
                    <DetailItem label="이미지" value={push.fname} isUrl />
                    <DetailItem label="링크" value={push.link} isUrl />
                  </Section>

                  <Section title="에러 정보" isLast>
                    <DetailItem
                      label="Android 에러"
                      value={push.andErrormessage}
                      isError
                    />
                    <DetailItem
                      label="iOS 에러"
                      value={push.iosErrormessage}
                      isError
                    />
                    <DetailItem
                      label="일반 에러"
                      value={push.errormessage}
                      isError
                    />
                  </Section>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
