import { formatDate } from "@push-manager/shared/utils/date.util";
import { StatusChip } from "@commonComponents/dataDisplay/statusChip.component";
import { InfoTooltip } from "@commonComponents/dataDisplay/infoTooltip.component";
import { StatusGuideContent } from "app/push/components/guides/statusGuide.component";
import { StatusChipType, TableHeader } from "app/types/prop.type";
import { HiRefresh } from "react-icons/hi";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";
import { useSort } from "app/common/hooks/useTableSort.hook";

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

const TABLE_HEADERS: TableHeader[] = [
  { key: "cmpncode", label: "캠페인 코드", sortable: true },
  { key: "appId", label: "앱 구분", sortable: true },
  { key: "title", label: "제목", sortable: true },
  { key: "rStartDate", label: "발송(예정) 시각", sortable: true },
  { key: "step", label: "상태", sortable: true },
];

export function PushResultTable({
  pushes,
  onPushSelect,
  onRefresh,
  pagination,
}: PushResultTableProps) {
  // 정렬 기능 추가
  const { items: sortedPushes, renderSortButton } =
    useSort<PushTableProps>(pushes);

  const renderCell = (push: PushTableProps, key: string, index: number) => {
    switch (key) {
      case "cmpncode":
        return push.cmpncode ? push.cmpncode : index + 1;
      case "appId":
        return push.appId;
      case "title":
        return push.title;
      case "rStartDate":
        return formatDate(push.rStartDate);
      case "step":
        return (
          <StatusChip type={push.type} step={push.step} fpStep={push.fpStep} />
        );
      default:
        return String(push[key as keyof PushTableProps] || "");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {TABLE_HEADERS.map(({ key, label, sortable }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key === "step" ? (
                  <div className="flex items-center gap-2">
                    {sortable
                      ? renderSortButton(key as keyof PushTableProps, label)
                      : label}
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
                  </div>
                ) : sortable ? (
                  renderSortButton(key as keyof PushTableProps, label)
                ) : (
                  label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedPushes.length > 0 ? (
            sortedPushes.map((push, index) => (
              <tr
                key={`${push.title}-${push.rStartDate}-${index}`}
                onClick={() => onPushSelect(push)}
                className="cursor-pointer hover:bg-gray-50"
              >
                {TABLE_HEADERS.map(({ key }) => (
                  <td
                    key={`${index}-${key}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {renderCell(push, key, index)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <EmptyState colSpan={TABLE_HEADERS.length} />
          )}
        </tbody>
      </table>
      {pagination && <Pagination {...pagination} />}
    </div>
  );
}
