import {
  BadRequestException,
  GetMemberCouponsDto,
  GetSubscriptionRewardRequestsDto,
  IMembershipAppCoupon,
  INewbestCommonCoupons,
  INewbestObsCoupons,
} from "@push-manager/shared";
import { CouponRepository } from "../../repositories/admin/coupon.repository";
import { ICouponService } from "../../interfaces/admin/coupon.interface";
import { NewbestService } from "../external/newbest.service";
import { MemberService } from "./member.service";

export class CouponService implements ICouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly newbestService: NewbestService,
    private readonly memberService: MemberService
  ) {}

  async getSubscriptionRewardRequests(dto: GetSubscriptionRewardRequestsDto) {
    return await this.couponRepository.findSubscriptionRewardRequestsByDate(
      dto.startAt,
      dto.endAt
    );
  }

  async getMemberCoupons(dto: GetMemberCouponsDto) {
    if (dto.type === "common") {
      const parking = await this.newbestService.getCoupons(dto.memNo, "P");
      const free = await this.newbestService.getCoupons(dto.memNo, "F");

      return { parking, free } as INewbestCommonCoupons;
    } else if (dto.type === "obs") {
      const member = await this.memberService.getMemberByMemNo(dto);
      const obs = await this.newbestService.getObsCoupons(member.ci);

      return { obs } as INewbestObsCoupons;
    } else if (dto.type === "app") {
      const member = await this.memberService.getMemberByMemNo(dto);
      const app = await this.couponRepository.getAppCouponsByMemberId(
        member.id
      );
      return app as IMembershipAppCoupon[];
    } else {
      throw new BadRequestException("Invalid coupon type");
    }
  }
}
