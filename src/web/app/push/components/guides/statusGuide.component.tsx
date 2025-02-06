import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
import { StatusChip } from "@commonComponents/dataDisplay/statusChip.component";
import { StatusChipType } from "app/types/prop.type";

export function StatusGuideContent({ type }: { type: StatusChipType }) {
  return (
    <>
      <p className="font-medium mb-2">푸시 상태 안내</p>
      <ul className="space-y-2">
        {type === "master" ? (
          <li className="flex items-center">
            <div className="w-[120px]">
              <StatusChip type={type} step={StepEnum.PENDING} />
            </div>
            <span className="text-gray-200 ml-2">
              예약은 진행했으나 아직 발송 요청하지 않은 상태
              <br />
              (클릭하여 발송 요청 필요)
            </span>
          </li>
        ) : null}
        <li className="flex items-center">
          <div className="w-[120px]">
            <StatusChip
              type={type}
              step={type === "master" ? StepEnum.COMPLETED : StepEnum.PENDING}
              fpStep={type === "master" ? StepEnum.SENDING : undefined}
            />
          </div>
          <span className="text-gray-200 ml-2">
            발송 요청 후 예약 시간 대기 상태
          </span>
        </li>
        <li className="flex items-center">
          <div className="w-[120px]">
            <StatusChip
              type={type}
              step={StepEnum.COMPLETED}
              fpStep={StepEnum.COMPLETED}
            />
          </div>
          <span className="text-gray-200 ml-2">발송 완료</span>
        </li>
        <li className="flex items-center">
          <div className="w-[120px]">
            <StatusChip
              type={type}
              step={StepEnum.FAILED}
              fpStep={StepEnum.FAILED}
            />
          </div>
          <span className="text-gray-200 ml-2">실패 / 오류</span>
        </li>
        <li className="flex items-center">
          <div className="w-[120px]">
            <StatusChip
              type={type}
              step={StepEnum.SENDING}
              fpStep={StepEnum.SENDING}
            />
          </div>
          <span className="text-gray-200 ml-2">기타 과정</span>
        </li>
      </ul>
    </>
  );
}
