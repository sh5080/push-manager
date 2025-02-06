import {
  IMember,
  IMemberWithNewbestInfo,
} from "@push-manager/shared/types/entities/admin/member.entity";
// import { ICouponPool } from "@push-manager/shared/types/entities/admin/couponPool.entity";
import { BaseAPI } from "../base.api";

class MemberAPI extends BaseAPI {
  async getMemberByMemNo(memNo: string): Promise<IMemberWithNewbestInfo> {
    return await this.customFetch<IMemberWithNewbestInfo>(
      `/api/admin/member?memNo=${memNo}`
    );
  }

  //   async getMemberCoupons(memberId: string): Promise<ICouponPool[]> {
  //     return await this.customFetch<ICouponPool[]>(
  //       `/api/admin/members?memberId=${memberId}&coupons`
  //     );
  //   }
}

export const memberApi = new MemberAPI();
