import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export function getMasterStatusText(
  step: (typeof StepEnum)[keyof typeof StepEnum],
  fpstep?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  if (step === StepEnum.COMPLETED && fpstep === StepEnum.COMPLETED) {
    return "발송 완료";
  }

  if (step === StepEnum.COMPLETED && fpstep === StepEnum.SENDING) {
    return "발송 요청 완료";
  }

  switch (step) {
    case StepEnum.FAILED:
      return "실패";
    case StepEnum.TRANSACTION:
      return "발송 요청 중";
    case StepEnum.PENDING:
      return "예약 대기 중";
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
      return "발송 준비 중";
    case StepEnum.PENDING:
      return "발송 요청 완료";
    case StepEnum.SENDING:
      return "발송 준비 중";
    default:
      return "오류";
  }
}
