import { GetCouponsDto } from "@push-manager/shared/dtos/admin/coupon.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "../base.api";
import { IMembershipAppCoupon } from "@push-manager/shared/types/entities/admin/coupon.entity";
import { PaginatedResponse } from "@push-manager/shared";

class CouponAPI extends BaseAPI {
  async getCoupons(
    dto: GetCouponsDto
  ): Promise<PaginatedResponse<IMembershipAppCoupon>> {
    const validatedDto = await validateDto(GetCouponsDto, dto);
    const { type, page, pageSize, sn, status, memNo } = validatedDto;
    const queryParams = new URLSearchParams();
    if (page) {
      queryParams.append("page", page.toString());
    }
    if (pageSize) {
      queryParams.append("pageSize", pageSize.toString());
    }
    if (sn) {
      queryParams.append("sn", sn);
    }
    if (status) {
      queryParams.append("status", status);
    }
    if (memNo) {
      queryParams.append("memNo", memNo);
    }

    return this.customFetch<PaginatedResponse<IMembershipAppCoupon>>(
      `/api/admin/coupon?${queryParams}&type=${type}`
    );
  }
}

export const couponApi = new CouponAPI();
