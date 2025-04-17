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

export interface ICouponService {
  getCoupons(
    dto: GetCouponsDto
  ): Promise<PaginatedResponse<IMembershipAppCoupon>>;
  getMemberCoupons(
    dto: GetMemberCouponsDto
  ): Promise<
    INewbestCommonCoupons | INewbestObsCoupons | IMembershipAppCoupon[]
  >;
  getSubscriptionRewardRequests(
    dto: GetSubscriptionRewardRequestsDto
  ): Promise<SubscriptionRewardRequest[]>;
}
