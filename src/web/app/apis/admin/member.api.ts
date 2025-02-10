import { IMemberWithNewbestInfo } from "@push-manager/shared/types/entities/admin/member.entity";
import { IMembershipAppCoupon } from "@push-manager/shared/types/entities/admin/coupon.entity";

import { BaseAPI } from "../base.api";
import {
  GetMemberByMemNoDto,
  GetMemberCouponsDto,
  INewbestCommonCoupons,
  INewbestObsCoupons,
} from "@push-manager/shared";
import { CouponType } from "@push-manager/shared/dist/types/newbest.type";

type CouponResponseType<T extends CouponType> = T extends "app"
  ? IMembershipAppCoupon[]
  : T extends "common"
  ? INewbestCommonCoupons
  : T extends "obs"
  ? INewbestObsCoupons
  : never;

class MemberAPI extends BaseAPI {
  async getMemberByMemNo(
    dto: GetMemberByMemNoDto
  ): Promise<IMemberWithNewbestInfo> {
    return await this.customFetch<IMemberWithNewbestInfo>(
      `/api/admin/member?memNo=${dto.memNo}`
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
