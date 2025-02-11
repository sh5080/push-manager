import {
  GetCouponsDto,
  GetMemberCouponsDto,
  GetSubscriptionRewardRequestsDto,
  IMembershipAppCoupon,
  INewbestCommonCoupons,
  INewbestObsCoupons,
  PaginatedResponse,
} from "@push-manager/shared";
import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";
import { CouponPool } from "@/src/models/admin/CouponPool";

export interface ICouponService {
  getCoupons(dto: GetCouponsDto): Promise<PaginatedResponse<CouponPool>>;
  getMemberCoupons(
    dto: GetMemberCouponsDto
  ): Promise<
    INewbestCommonCoupons | INewbestObsCoupons | IMembershipAppCoupon[]
  >;
  getSubscriptionRewardRequests(
    dto: GetSubscriptionRewardRequestsDto
  ): Promise<SubscriptionRewardRequest[]>;
}
