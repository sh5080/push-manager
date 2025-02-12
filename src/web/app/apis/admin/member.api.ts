import { IMemberWithNewbestInfo } from "@push-manager/shared/types/entities/admin/member.entity";
import { IMembershipAppCoupon } from "@push-manager/shared/types/entities/admin/coupon.entity";

import { BaseAPI } from "../base.api";
import {
  INewbestCommonCoupons,
  INewbestObsCoupons,
} from "@push-manager/shared";
import { CouponType } from "@push-manager/shared/dist/types/newbest.type";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { GetMemberDto } from "@push-manager/shared/dtos/admin/member.dto";
import { GetMemberCouponsDto } from "@push-manager/shared/dtos/admin/coupon.dto";

type CouponResponseType<T extends CouponType> = T extends "app"
  ? IMembershipAppCoupon[]
  : T extends "common"
  ? INewbestCommonCoupons
  : T extends "obs"
  ? INewbestObsCoupons
  : never;

class MemberAPI extends BaseAPI {
  async getMember(dto: GetMemberDto): Promise<IMemberWithNewbestInfo> {
    const validatedDto = await validateDto(GetMemberDto, dto);

    const queryString = Object.entries(validatedDto)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return await this.customFetch<IMemberWithNewbestInfo>(
      `/api/admin/member?${queryString}`
    );
  }

  async getMemberCoupons<T extends CouponType = "app">(
    dto: Omit<GetMemberCouponsDto, "type"> & { type?: T }
  ): Promise<CouponResponseType<T>> {
    return await this.customFetch<CouponResponseType<T>>(
      `/api/admin/coupon/member?memNo=${dto.memNo}&type=${dto.type}`
    );
  }
}

export const memberApi = new MemberAPI();
