import {
  BadRequestException,
  GetMemberCouponsDto,
  GetSubscriptionRewardRequestsDto,
  IMemberCommonCoupons,
  IMemberObsCoupons,
} from "@push-manager/shared";
import { SubscriptionRewardRequestRepository } from "../../repositories/admin/subscriptionRewardRequest.repository";
import { ICouponService } from "../../interfaces/admin/coupon.interface";
import { NewbestService } from "../external/newbest.service";
import { MemberService } from "./member.service";

export class CouponService implements ICouponService {
  constructor(
    private readonly subscriptionRewardRequestRepository: SubscriptionRewardRequestRepository,
    private readonly newbestService: NewbestService,
    private readonly memberService: MemberService
  ) {}

  async getSubscriptionRewardRequests(dto: GetSubscriptionRewardRequestsDto) {
    return await this.subscriptionRewardRequestRepository.findByDate(
      dto.startAt,
      dto.endAt
    );
  }

  async getMemberCoupons(dto: GetMemberCouponsDto) {
    if (dto.type === "common") {
      const parking = await this.newbestService.getCoupons(dto.memNo, "P");
      const free = await this.newbestService.getCoupons(dto.memNo, "F");

      return { parking, free } as IMemberCommonCoupons;
    } else if (dto.type === "obs") {
      const member = await this.memberService.getMemberByMemNo(dto);
      const obs = await this.newbestService.getObsCoupons(member.ci);

      return { obs } as IMemberObsCoupons;
    } else {
      throw new BadRequestException("Invalid coupon type");
    }
  }
}
