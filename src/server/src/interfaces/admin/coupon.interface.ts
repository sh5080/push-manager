import {
  GetMemberCouponsDto,
  GetSubscriptionRewardRequestsDto,
  IMemberCommonCoupons,
  IMemberObsCoupons,
} from "@push-manager/shared";
import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";

export interface ICouponService {
  getSubscriptionRewardRequests(
    dto: GetSubscriptionRewardRequestsDto
  ): Promise<SubscriptionRewardRequest[]>;
  getMemberCoupons(
    dto: GetMemberCouponsDto
  ): Promise<IMemberCommonCoupons | IMemberObsCoupons>;
}
