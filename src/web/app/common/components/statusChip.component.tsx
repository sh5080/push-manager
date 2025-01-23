import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
import { StatusChipType } from "app/types/prop.type";
import {
  getMasterStatusStyle,
  getMessageStatusStyle,
} from "app/utils/chip.util";
import { getMasterStatusText, getMessageStatusText } from "app/utils/chip.util";

interface StatusChipProps {
  type: StatusChipType;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  fpstep?: (typeof StepEnum)[keyof typeof StepEnum];
}

export function StatusChip({ type, step, fpstep }: StatusChipProps) {
  const getChipStyle = () => {
    return type === "master"
      ? getMasterStatusStyle(step, fpstep)
      : getMessageStatusStyle(step);
  };

  const getStatusText = () => {
    return type === "master"
      ? getMasterStatusText(step, fpstep)
      : getMessageStatusText(step);
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
        ${getChipStyle()}
      `}
    >
      {getStatusText()}
    </span>
  );
}
