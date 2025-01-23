import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { formatDateToString } from "../../utils/push.util";
import {
  getStatusStyle,
  getMasterStatusText,
  getStatusDotStyle,
} from "../../utils/chip.util";

interface PushListItemProps {
  push: IPushStsMsg;
  index: number;
  onClick: () => void;
}

export function PushListItem({ push, index, onClick }: PushListItemProps) {
  return (
    <tr
      className="group hover:bg-blue-50 cursor-pointer transition-all duration-150"
      onClick={onClick}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-blue-600">
        #{index + 1}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mb-0.5">
          {push.title}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {push.userId}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatDateToString(push.senddate)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
            push.step
          )}`}
        >
          <span
            className={`w-1.5 h-1.5 mr-1.5 rounded-full ${getStatusDotStyle(
              push.step
            )}`}
          ></span>
          {getMasterStatusText(push.step!)}
        </span>
      </td>
    </tr>
  );
}
