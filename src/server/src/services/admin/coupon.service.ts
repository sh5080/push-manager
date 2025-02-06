import { GetSubscriptionRewardRequestsDto } from "@push-manager/shared";
import { SubscriptionRewardRequestRepository } from "../../repositories/admin/subscriptionRewardRequest.repository";
import { ICouponService } from "../../interfaces/admin/coupon.interface";

export class CouponService implements ICouponService {
  constructor(
    private readonly subscriptionRewardRequestRepository: SubscriptionRewardRequestRepository
  ) {}

  // async getCouponsByMemNo(dto: GetCouponsByMemNoDto) {
  //   return await this.couponRepository.findByMemNo(dto);
  // }

  async getSubscriptionRewardRequests(dto: GetSubscriptionRewardRequestsDto) {
    return await this.subscriptionRewardRequestRepository.findByDate(
      dto.startAt,
      dto.endAt
    );
  }
}
