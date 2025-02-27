import { formatDate } from "@push-manager/shared/utils/date.util";
import { ISubscriptionRewardRequest } from "@push-manager/shared/types/entities/admin/subscriptionRewardRequest.entity";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";
import { useSort } from "app/common/hooks/useTableSort.hook";
import { TableHeader } from "app/types/prop.type";

export function SubscriptionRewardList({
  rewards,
}: {
  rewards: ISubscriptionRewardRequest[];
}) {
  const TABLE_HEADERS: TableHeader[] = [
    { key: "memNo", label: "회원번호", sortable: true },
    { key: "grade", label: "등급", sortable: true },
    { key: "itemName", label: "상품명", sortable: true },
    { key: "createdAt", label: "발급일시", sortable: true },
  ];

  const { items: sortedRewards, renderSortButton } =
    useSort<ISubscriptionRewardRequest>(rewards);

  const formatValue = (value: any, key: keyof ISubscriptionRewardRequest) => {
    if (key === "createdAt") {
      return formatDate(value, "+00:00");
    }
    return String(value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                {header.sortable
                  ? renderSortButton(
                      header.key as keyof ISubscriptionRewardRequest,
                      header.label
                    )
                  : header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sortedRewards.length > 0 ? (
            sortedRewards.map((reward) => (
              <tr
                key={reward.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {TABLE_HEADERS.map((header) => (
                  <td
                    key={`${reward.id}-${header.key}`}
                    className="px-6 py-4 text-sm text-gray-900"
                  >
                    {formatValue(
                      reward[header.key as keyof ISubscriptionRewardRequest],
                      header.key as keyof ISubscriptionRewardRequest
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <EmptyState colSpan={TABLE_HEADERS.length} />
          )}
        </tbody>
      </table>
    </div>
  );
}
