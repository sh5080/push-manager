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

export const convertValueToAppId = (value: number): string => {
  switch (value) {
    case 1:
      return "프리디앱";
    case 2:
      return "운영";
    default:
      return "프리디앱 / 운영";
  }
};

export const convertValueToTeamId = (value: number): string => {
  switch (value) {
    case 1:
      return "FREED";
    case 2:
      return "LG";
    default:
      return "-";
  }
};
