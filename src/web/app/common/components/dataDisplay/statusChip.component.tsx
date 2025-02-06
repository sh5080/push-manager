import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
import { StatusChipType } from "app/types/prop.type";
import {
  getMasterStatusStyle,
  getMessageStatusStyle,
} from "app/utils/chip/pushResult/style.util";
import {
  getMasterStatusText,
  getMessageStatusText,
} from "app/utils/chip/pushResult/text.util";

interface StatusChipProps {
  type: StatusChipType;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  fpStep?: (typeof StepEnum)[keyof typeof StepEnum];
}

export function StatusChip({ type, step, fpStep }: StatusChipProps) {
  const getChipStyle = () => {
    return type === "master"
      ? getMasterStatusStyle(step, fpStep)
      : getMessageStatusStyle(step);
  };

  const getStatusText = () => {
    return type === "master"
      ? getMasterStatusText(step, fpStep)
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
