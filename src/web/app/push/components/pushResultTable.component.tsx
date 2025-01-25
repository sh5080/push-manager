import { formatDate } from "@push-manager/shared/utils/date.util";
import { StatusChip } from "app/common/components/statusChip.component";
import { InfoTooltip } from "app/common/components/infoTooltip.component";
import { StatusGuideContent } from "app/push/components/guides/statusGuide.component";
import { StatusChipType } from "app/types/prop.type";
import { HiRefresh } from "react-icons/hi";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
interface PushTableProps {
  type: StatusChipType;
  cmpncode?: string;
  title: string;
  rstartDate: Date | string;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  fpstep?: (typeof StepEnum)[keyof typeof StepEnum];
}
interface PushResultTableProps {
  pushes: PushTableProps[];
  onPushSelect: (push: any) => void;
  onRefresh: () => void;
}

export function PushResultTable({
  pushes,
  onPushSelect,
  onRefresh,
}: PushResultTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {pushes.length && pushes[0].cmpncode ? "캠페인 코드" : ""}
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              발송 예정 시각
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
              상태
              <InfoTooltip
                content={
                  <StatusGuideContent type={"master" as StatusChipType} />
                }
                width="w-[420px]"
                position="left"
              />
              <button
                onClick={onRefresh}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                title="새로고침"
              >
                <HiRefresh className="w-4 h-4" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pushes.map((push, index) => (
            <tr
              key={`${push.title}-${push.rstartDate}-${index}`}
              onClick={() => onPushSelect(push)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {push.cmpncode ? push.cmpncode : index + 1}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {push.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(push.rstartDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusChip
                  type={push.type}
                  step={push.step}
                  fpstep={push.fpstep}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
