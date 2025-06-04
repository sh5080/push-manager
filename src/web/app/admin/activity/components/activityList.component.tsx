import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";
import { useSort } from "app/common/hooks/useTableSort.hook";
import { TableHeader } from "app/types/prop.type";
import { formatDate } from "@push-manager/shared/utils/date.util";

interface ActivityListProps {
  activities: any[];
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const TABLE_HEADERS: TableHeader[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "kind", label: "활동 종류", sortable: true },
  { key: "bestshopNm", label: "선호매장명", sortable: true },
  { key: "value", label: "활동 정보", sortable: false },
  { key: "createdAt", label: "생성일시", sortable: true },
];

export function ActivityList({
  activities,
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: ActivityListProps) {
  const totalPages = Math.ceil(total / pageSize);

  const { items: sortedActivities, renderSortButton } = useSort<any>(activities);

  const renderCell = (activity: any, key: string) => {
    switch (key) {
      case "id":
        return activity.id;
      case "kind":
        return activity.kind === "EVENT_COMPLETED" ? "EVENT" : "CPA";
      case "bestshopNm":
        return activity.bestshopNm === null ? "오류" : activity.bestshopNm;
      case "value":
        return (
          <div className="space-y-1 min-w-[180px]">
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">회원번호</span>
              <span>{activity.value.memNo}</span>
            </div>
            {activity.value.eventId && (
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-500">이벤트 ID</span>
                <span>{activity.value.eventId}</span>
              </div>
            )}

            {activity.value.eventData && (
              <>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-500">레벨</span>
                  <span>{activity.value.eventData.level}</span>
                </div>
                {activity.value.eventData.submissions && (
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-500">서브미션</span>
                    <div className="text-right">
                      {Object.entries(activity.value.eventData.submissions).map(
                        ([key, value]) => (
                          <div key={key}>
                            {key}: {formatDate(value as string, "-09:00")}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      case "createdAt":
        return formatDate(activity.createdAt, "-09:00");
      default:
        return String(activity[key] || "");
    }
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {TABLE_HEADERS.map(({ key, label, sortable }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {sortable ? renderSortButton(key, label) : label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedActivities.length ? (
            sortedActivities.map((activity) => (
              <tr key={activity.id}>
                {TABLE_HEADERS.map(({ key }) => (
                  <td key={`${activity.id}-${key}`} className="px-6 py-4 text-sm">
                    {renderCell(activity, key)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <EmptyState colSpan={TABLE_HEADERS.length} />
          )}
        </tbody>
      </table>
      <div className="py-4">
        <Pagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
} 