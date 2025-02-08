import { IMembershipAppCoupon } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { formatDate } from "@push-manager/shared/utils/date.util";
import {
  getStatusChipStyle,
  getDiscountTypeChipStyle,
} from "app/utils/chip/common/style.util";
import { getCouponStatusChipText } from "app/utils/chip/common/text.util";
import { CouponList } from "./couponList.component";
import { usePagination } from "app/common/hooks/usePagination.hook";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";

interface AppCouponListProps {
  coupons: IMembershipAppCoupon[];
}

export function AppCouponList({ coupons }: AppCouponListProps) {
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedItems,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
  } = usePagination(coupons);

  const headers = [
    "쿠폰번호",
    "쿠폰명",
    "상태",
    "할인유형",
    "발급일",
    "만료일",
  ];

  return (
    <div>
      <CouponList headers={headers}>
        {paginatedItems.map((coupon) => (
          <tr key={coupon.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{coupon.sn}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {coupon.Coupon.name}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusChipStyle(
                  coupon.status
                )}`}
              >
                {getCouponStatusChipText(coupon.status)}
              </span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs ${getDiscountTypeChipStyle(
                  coupon.Coupon.discountType
                )}`}
              >
                {coupon.Coupon.discountType}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {coupon.issuedAt ? formatDate(coupon.issuedAt, "+00:00") : "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              {coupon.endDate ? formatDate(coupon.endDate, "+00:00") : "-"}
            </td>
          </tr>
        ))}
      </CouponList>
      <Pagination
        total={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
