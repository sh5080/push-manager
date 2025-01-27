import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export const convertValueToStepEnum = (
  value: 0 | 1 | 2 | 3 | 4 | 5
): (typeof StepEnum)[keyof typeof StepEnum] | undefined => {
  switch (value) {
    case 1:
      return StepEnum.PENDING;
    case 2:
      return StepEnum.SENDING;
    case 3:
      return StepEnum.COMPLETED;
    case 4:
      return StepEnum.FAILED;
    case 5:
      return StepEnum.TRANSACTION;
    case 0:
    default:
      return undefined;
  }
};
