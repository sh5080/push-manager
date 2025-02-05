import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export function getMasterStatusStyle(
  step?: (typeof StepEnum)[keyof typeof StepEnum],
  fpStep?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  if (step === StepEnum.COMPLETED && fpStep === StepEnum.FAILED) {
    return "bg-red-50 text-red-700";
  }

  if (step === StepEnum.COMPLETED && fpStep === StepEnum.SENDING) {
    return "bg-blue-50 text-blue-700";
  }

  if (step === StepEnum.PENDING && !fpStep) {
    return "bg-yellow-50 text-yellow-700";
  }

  switch (step) {
    case StepEnum.COMPLETED:
      return "bg-green-50 text-green-700";
    case StepEnum.FAILED:
      return "bg-red-50 text-red-700";
    case StepEnum.TRANSACTION:
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-gray-50 text-gray-700";
  }
}
export function getMessageStatusStyle(
  step?: (typeof StepEnum)[keyof typeof StepEnum],
  fpStep?: (typeof StepEnum)[keyof typeof StepEnum]
) {
  if (step === StepEnum.COMPLETED && fpStep === StepEnum.FAILED) {
    return "bg-red-50 text-red-700";
  }

  if (step === StepEnum.PENDING && !fpStep) {
    return "bg-blue-50 text-blue-700";
  }

  switch (step) {
    case StepEnum.COMPLETED:
      return "bg-green-50 text-green-700";
    case StepEnum.FAILED:
      return "bg-red-50 text-red-700";
    case StepEnum.TRANSACTION:
      return "bg-blue-50 text-blue-700";
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

export function getStepColorStyle(step?: string) {
  switch (step) {
    case "C":
      return "bg-green-100 text-green-800";
    case "F":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getSendStatColorStyle(sendStat?: string) {
  switch (sendStat) {
    case "0001":
      return "bg-blue-100 text-blue-800";
    case "0002":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
