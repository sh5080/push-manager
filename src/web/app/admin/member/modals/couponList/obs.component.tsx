import { INewbestObsCoupons } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { CouponList } from "./couponList.component";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";
import { usePagination } from "app/common/hooks/usePagination.hook";

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

  const headers = [
    "쿠폰번호",
    "쿠폰명",
    "할인유형",
    "할인금액",
    "사용여부",
    "유효기간",
  ];

  return (
    <div>
      <CouponList headers={headers}>
        {paginatedItems.map((coupon) => (
          <tr key={coupon.COUPON_NO}>
            <td className="px-6 py-4">{coupon.COUPON_NO}</td>
            <td className="px-6 py-4">{coupon.COUPON_NM}</td>
            <td className="px-6 py-4">{coupon.COUPON_TYPE}</td>
            <td className="px-6 py-4">{coupon.COUPON_AMT}</td>
            <td className="px-6 py-4">
              {coupon.USE_YN === "Y" ? "사용완료" : "미사용"}
            </td>
            <td className="px-6 py-4">{`${coupon.START_DATE_TIME} ~ ${coupon.END_DATE_TIME}`}</td>
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
