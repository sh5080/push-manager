import { formatDate } from "@push-manager/shared/utils/date.util";
import { ISubscriptionRewardRequest } from "@push-manager/shared/types/entities/admin/subscriptionRewardRequest.entity";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";

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
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rewards.length > 0 ? (
            rewards.map((reward) => (
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
            <EmptyState colSpan={4} />
          )}
        </tbody>
      </table>
    </div>
  );
}
