import { INewbestCommonCoupons } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { CouponList } from "./couponList.component";
import { usePagination } from "app/common/hooks/usePagination.hook";
import { Pagination } from "@commonComponents/dataDisplay/pagination.component";

interface CommonCouponListProps {
  coupons: INewbestCommonCoupons;
}

export function CommonCouponList({ coupons }: CommonCouponListProps) {
  const {
    currentPage: parkingCurrentPage,
    pageSize: parkingPageSize,
    totalPages: parkingTotalPages,
    paginatedItems: paginatedParkingItems,
    handlePageChange: handleParkingPageChange,
    handlePageSizeChange: handleParkingPageSizeChange,
    totalItems: parkingTotalItems,
  } = usePagination(coupons?.parking || []);

  const {
    currentPage: freeCurrentPage,
    pageSize: freePageSize,
    totalPages: freeTotalPages,
    paginatedItems: paginatedFreeItems,
    handlePageChange: handleFreePageChange,
    handlePageSizeChange: handleFreePageSizeChange,
    totalItems: freeTotalItems,
  } = usePagination(coupons?.free || []);

  const headers = ["쿠폰번호", "쿠폰명", "사용여부", "유효기간"];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">주차 쿠폰</h3>
      <CouponList headers={headers}>
        {paginatedParkingItems.map((coupon) => (
          <tr key={coupon.COUPON_NO}>
            <td className="px-6 py-4">{coupon.COUPON_NO}</td>
            <td className="px-6 py-4">{coupon.COUPON_NM}</td>
            <td className="px-6 py-4">
              {coupon.USE_YN === "Y" ? "사용완료" : "미사용"}
            </td>
            <td className="px-6 py-4">{`${coupon.COUPON_ST_DT} ~ ${coupon.COUPON_ED_DT}`}</td>
          </tr>
        ))}
      </CouponList>
      <Pagination
        total={parkingTotalItems}
        currentPage={parkingCurrentPage}
        pageSize={parkingPageSize}
        totalPages={parkingTotalPages}
        onPageChange={handleParkingPageChange}
        onPageSizeChange={handleParkingPageSizeChange}
      />

      <h3 className="text-lg font-medium mb-4 mt-8">무상이전설치 쿠폰</h3>
      <CouponList headers={headers}>
        {paginatedFreeItems.map((coupon) => (
          <tr key={coupon.COUPON_NO}>
            <td className="px-6 py-4">{coupon.COUPON_NO}</td>
            <td className="px-6 py-4">{coupon.COUPON_NM}</td>
            <td className="px-6 py-4">
              {coupon.USE_YN === "Y" ? "사용완료" : "미사용"}
            </td>
            <td className="px-6 py-4">{`${coupon.COUPON_ST_DT} ~ ${coupon.COUPON_ED_DT}`}</td>
          </tr>
        ))}
      </CouponList>
      <Pagination
        total={freeTotalItems}
        currentPage={freeCurrentPage}
        pageSize={freePageSize}
        totalPages={freeTotalPages}
        onPageChange={handleFreePageChange}
        onPageSizeChange={handleFreePageSizeChange}
      />
    </div>
  );
}
