import { formatDate } from "@push-manager/shared/utils/date.util";
import { ISubscriptionRewardRequest } from "@push-manager/shared/types/entities/admin/subscriptionRewardRequest.entity";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";
import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

type SortDirection = "asc" | "desc" | null;
type SortField = "createdAt" | "memNo" | null;

export function SubscriptionRewardList({
  rewards,
}: {
  rewards: ISubscriptionRewardRequest[];
}) {
  const headers: { key: keyof ISubscriptionRewardRequest; label: string }[] = [
    { key: "memNo", label: "회원번호" },
    { key: "grade", label: "등급" },
    { key: "itemName", label: "상품명" },
    { key: "createdAt", label: "발급일시" },
  ];

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    if (sortDirection === "asc")
      return <FaSortUp className="ml-1 text-blue-500" />;
    return <FaSortDown className="ml-1 text-blue-500" />;
  };

  // 데이터 정렬
  const sortedRewards = [...rewards];
  if (sortField && sortDirection) {
    sortedRewards.sort((a, b) => {
      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "memNo") {
        const memberA = a.memNo.toString();
        const memberB = b.memNo.toString();
        return sortDirection === "asc"
          ? memberA.localeCompare(memberB)
          : memberB.localeCompare(memberA);
      }
      return 0;
    });
  }

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
            {headers.map((header) => (
              <th
                key={header.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                {header.key === "createdAt" || header.key === "memNo" ? (
                  <button
                    className="flex items-center focus:outline-none"
                    onClick={() => toggleSort(header.key as SortField)}
                  >
                    {header.label}
                    {renderSortIcon(header.key as SortField)}
                  </button>
                ) : (
                  header.label
                )}
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
                {headers.map((header) => (
                  <td
                    key={`${reward.id}-${header.key}`}
                    className="px-6 py-4 text-sm text-gray-900"
                  >
                    {formatValue(reward[header.key], header.key)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <EmptyState colSpan={headers.length} />
          )}
        </tbody>
      </table>
    </div>
  );
}
