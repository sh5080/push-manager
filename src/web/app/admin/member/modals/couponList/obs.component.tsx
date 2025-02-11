import { INewbestObsCoupons } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { CouponList } from "./couponList.component";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { usePagination } from "app/common/hooks/usePagination.hook";
import { getStatusChipStyle } from "app/utils/chip/common/style.util";
import { formatDateString } from "@push-manager/shared/utils/date.util";

interface ObsCouponListProps {
  coupons: INewbestObsCoupons;
}

export function ObsCouponList({ coupons }: ObsCouponListProps) {
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedItems,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
  } = usePagination(coupons?.obs || []);

  const headers = ["쿠폰번호", "쿠폰명", "할인", "사용여부", "유효기간"];

  return (
    <div>
      <CouponList title="" headers={headers}>
        {paginatedItems.map((coupon) => (
          <tr key={coupon.COUPON_NO}>
            <td className="px-6 py-4 text-sm">{coupon.COUPON_NO}</td>
            <td className="px-6 py-4 text-sm">{coupon.COUPON_NM}</td>
            <td className="px-6 py-4 text-sm">
              {coupon.COUPON_TYPE === "RATE"
                ? `${coupon.COUPON_AMT}%`
                : `${coupon.COUPON_AMT}원`}
            </td>
            <td className="px-6 py-4">
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusChipStyle(
                  coupon.USE_YN === "Y" ? "사용완료" : "미사용"
                )}`}
              >
                {coupon.USE_YN === "Y" ? "사용완료" : "미사용"}
              </span>
            </td>
            <td className="px-6 py-4 text-sm">
              {`${formatDateString(
                coupon.START_DATE_TIME
              )} ~ ${formatDateString(coupon.END_DATE_TIME)}`}
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
