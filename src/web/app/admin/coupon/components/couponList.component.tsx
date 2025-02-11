import { IMembershipAppCoupon } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { formatDate } from "@push-manager/shared/utils/date.util";

import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { getCouponStatusChipStyle } from "app/utils/chip/common/style.util";
import { EmptyState } from "@commonComponents/feedback/emptyState.component";
import { getCouponStatusChipText } from "app/utils/chip/common/text.util";

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

export function CouponList({
  coupons,
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: CouponListProps) {
  const totalPages = Math.ceil(total / pageSize);

  const headers = ["쿠폰번호", "쿠폰명", "할인금액", "상태", "날짜 정보"];

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {coupons.length ? (
            coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 text-sm">{coupon.sn}</td>
                <td className="px-6 py-4 text-sm">{coupon.Coupon?.name}</td>
                <td className="px-6 py-4 text-sm">
                  {coupon.Coupon?.discountValue.toString().slice(0, -5)}
                  {coupon.Coupon?.discountType === "AMOUNT" ? "원" : "%"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getCouponStatusChipStyle(
                      coupon.status
                    )}`}
                  >
                    {getCouponStatusChipText(coupon.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 min-w-[180px]">
                    <DateInfo label="사용일시" date={coupon.redeemedAt} />
                    <DateInfo label="유효기간" date={coupon.endDate} />
                    <DateInfo label="발급일시" date={coupon.issuedAt} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <EmptyState colSpan={headers.length} />
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
