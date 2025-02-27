import { IMembershipAppCoupon } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { formatDate } from "@push-manager/shared/utils/date.util";

import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { getCouponStatusChipStyle } from "app/utils/chip/common/style.util";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";
import { getCouponStatusChipText } from "app/utils/chip/common/text.util";
import { useSort } from "app/common/hooks/useTableSort.hook";
import { TableHeader } from "app/types/prop.type";

interface CouponListProps {
  coupons: IMembershipAppCoupon[];
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const DateInfo = ({
  label,
  date,
}: {
  label: string;
  date: Date | undefined;
}) => (
  <div className="flex justify-between text-sm py-1">
    <span className="text-gray-500">{label}</span>
    <span>{date ? formatDate(date, "+00:00") : "-"}</span>
  </div>
);

const TABLE_HEADERS: TableHeader[] = [
  { key: "sn", label: "쿠폰번호", sortable: true },
  { key: "name", label: "쿠폰명", sortable: true },
  { key: "discountValue", label: "할인금액", sortable: true },
  { key: "status", label: "상태", sortable: true },
  { key: "dates", label: "날짜 정보", sortable: false },
];

export function CouponList({
  coupons,
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: CouponListProps) {
  const totalPages = Math.ceil(total / pageSize);

  // 정렬 기능 추가
  const { items: sortedCoupons, renderSortButton } =
    useSort<IMembershipAppCoupon>(coupons);

  const renderCell = (coupon: IMembershipAppCoupon, key: string) => {
    switch (key) {
      case "sn":
        return coupon.sn;
      case "name":
        return coupon.Coupon?.name;
      case "discountValue":
        return (
          <>
            {coupon.Coupon?.discountValue.toString().slice(0, -5)}
            {coupon.Coupon?.discountType === "AMOUNT" ? "원" : "%"}
          </>
        );
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${getCouponStatusChipStyle(
              coupon.status
            )}`}
          >
            {getCouponStatusChipText(coupon.status)}
          </span>
        );
      case "dates":
        return (
          <div className="space-y-1 min-w-[180px]">
            <DateInfo label="사용일시" date={coupon.redeemedAt} />
            <DateInfo label="유효기간" date={coupon.endDate} />
            <DateInfo label="발급일시" date={coupon.issuedAt} />
          </div>
        );
      default:
        return String(coupon[key as keyof IMembershipAppCoupon] || "");
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
                {sortable
                  ? renderSortButton(key as keyof IMembershipAppCoupon, label)
                  : label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedCoupons.length ? (
            sortedCoupons.map((coupon) => (
              <tr key={coupon.id}>
                {TABLE_HEADERS.map(({ key }) => (
                  <td key={`${coupon.id}-${key}`} className="px-6 py-4 text-sm">
                    {renderCell(coupon, key)}
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
