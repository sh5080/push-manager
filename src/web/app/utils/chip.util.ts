import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export function getStatusStyle(
  step?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  switch (step) {
    case StepEnum.COMPLETED:
      return "bg-green-50 text-green-700";
    case StepEnum.FAILED:
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export function getStatusDotStyle(
  step?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  switch (step) {
    case StepEnum.COMPLETED:
      return "bg-green-400";
    case StepEnum.FAILED:
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
}

export function getMasterStatusText(
  step: (typeof StepEnum)[keyof typeof StepEnum],
  fpstep?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  if (step === StepEnum.COMPLETED && fpstep === StepEnum.COMPLETED) {
    return "발송 완료";
  }

  if (step === StepEnum.COMPLETED && fpstep === StepEnum.SENDING) {
    return "예약 확정 완료";
  }

  switch (step) {
    case StepEnum.FAILED:
      return "실패";
    case StepEnum.TRANSACTION:
      return "예약 확정중";
    case StepEnum.PENDING:
      return "예약 대기중";
    default:
      return "오류";
  }
}

export function getMessageStatusText(
  step?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  switch (step) {
    case StepEnum.COMPLETED:
      return "발송 완료";
    case StepEnum.FAILED:
      return "실패";
    case StepEnum.TRANSACTION:
      return "발송 준비중";
    case StepEnum.PENDING:
      return "예약 확정 완료";
    case StepEnum.SENDING:
      return "발송 준비중";
    default:
      return "오류";
  }
}
