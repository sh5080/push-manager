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
    const {
      type,
      page,
      pageSize,
      sn,
      status,
      memNo,
      redeemedAtFrom,
      redeemedAtTo,
    } = validatedDto;

    const params = {
      type,
      page: page?.toString(),
      pageSize: pageSize?.toString(),
      sn,
      status,
      memNo,
      redeemedAtFrom: redeemedAtFrom
        ? new Date(redeemedAtFrom).toISOString()
        : undefined,
      redeemedAtTo: redeemedAtTo
        ? new Date(redeemedAtTo).toISOString()
        : undefined,
    };

    const queryParams = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    );

    return this.customFetch<PaginatedResponse<IMembershipAppCoupon>>(
      `/api/admin/coupon?${queryParams}`
    );
  }
}

export const couponApi = new CouponAPI();
