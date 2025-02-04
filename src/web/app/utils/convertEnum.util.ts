import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
import { StepEnumType } from "app/types/prop.type";

export const convertValueToStepEnum = (
  value: StepEnumType
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
