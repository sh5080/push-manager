import { formatDate } from "@push-manager/shared/utils/date.util";
import { StatusChip } from "@commonComponents/dataDisplay/statusChip.component";
import { InfoTooltip } from "@commonComponents/dataDisplay/infoTooltip.component";
import { StatusGuideContent } from "app/push/components/guides/statusGuide.component";
import { StatusChipType } from "app/types/prop.type";
import { HiRefresh } from "react-icons/hi";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";

interface PushTableProps {
  type: StatusChipType;
  cmpncode?: string;
  title: string;
  rStartDate: Date | string;
  step: (typeof StepEnum)[keyof typeof StepEnum];
  fpStep?: (typeof StepEnum)[keyof typeof StepEnum];
  appId?: string;
}

interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

interface PushResultTableProps {
  pushes: PushTableProps[];
  onPushSelect: (push: any) => void;
  onRefresh: () => void;
  pagination?: PaginationProps;
}

export function PushResultTable({
  pushes,
  onPushSelect,
  onRefresh,
  pagination,
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
              앱 구분
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              발송(예정) 시각
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
          {pushes.length > 0 ? (
            pushes.map((push, index) => (
              <tr
                key={`${push.title}-${push.rStartDate}-${index}`}
                onClick={() => onPushSelect(push)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.cmpncode ? push.cmpncode : index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.appId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(push.rStartDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusChip
                    type={push.type}
                    step={push.step}
                    fpStep={push.fpStep}
                  />
                </td>
              </tr>
            ))
          ) : (
            <EmptyState colSpan={4} />
          )}
        </tbody>
      </table>
      {pagination && <Pagination {...pagination} />}
    </div>
  );
}
