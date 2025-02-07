import {
  GetMemberCouponsDto,
  GetSubscriptionRewardRequestsDto,
  IMembershipAppCoupon,
  INewbestCommonCoupons,
  INewbestObsCoupons,
} from "@push-manager/shared";
import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";

export interface ICouponService {
  getSubscriptionRewardRequests(
    dto: GetSubscriptionRewardRequestsDto
  ): Promise<SubscriptionRewardRequest[]>;
  getMemberCoupons(
    dto: GetMemberCouponsDto
  ): Promise<
    INewbestCommonCoupons | INewbestObsCoupons | IMembershipAppCoupon[]
  >;
}
