import {
  BadRequestException,
  GetCouponsDto,
  GetMemberCouponsDto,
  GetSubscriptionRewardRequestsDto,
  IMembershipAppCoupon,
  INewbestCommonCoupons,
  INewbestObsCoupons,
} from "@push-manager/shared";
import { CouponRepository } from "../../repositories/admin/coupon.repository";
import { ICouponService } from "../../interfaces/admin/coupon.interface";
import { NewbestApi } from "../external/newbest.api";
import { MemberService } from "./member.service";

export class CouponService implements ICouponService {
  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly newbestService: NewbestApi,
    private readonly memberService: MemberService
  ) {}
  async getNewbestMemberDetail(ci: string) {
    const newbestInfo = await this.newbestService.getMemberInfo(ci);
    return newbestInfo[0];
  }
  async getCoupons(dto: GetCouponsDto) {
    let memberId: string;

    if (dto.memNo) {
      const member = await this.memberService.getMember({
        memNo: dto.memNo,
      });
      memberId = member.id;
      const result = await this.couponRepository.getCoupons(dto, memberId);

      const enhancedData = await Promise.all(
        result.data.map(async (item) => {
          if (item.member?.ci) {
            const newbestInfo = await this.getNewbestMemberDetail(
              item.member.ci
            );
            return { ...item, newbestInfo };
          }
          return item;
        })
      );

      return { ...result, data: enhancedData };
    } else {
      const result = await this.couponRepository.getCoupons(dto);

      const enhancedData = await Promise.all(
        result.data.map(async (item) => {
          if (item.member?.ci) {
            const newbestInfo = await this.getNewbestMemberDetail(
              item.member.ci
            );
            return { ...item, newbestInfo };
          }
          return item;
        })
      );

      return { ...result, data: enhancedData };
    }
  }

  async getMemberCoupons(dto: GetMemberCouponsDto) {
    if (dto.type === "common") {
      const parking = await this.newbestService.getCoupons(dto.memNo, "P");
      const free = await this.newbestService.getCoupons(dto.memNo, "F");

      return { parking, free } as INewbestCommonCoupons;
    } else if (dto.type === "obs") {
      const member = await this.memberService.getMember(dto);
      const obs = await this.newbestService.getObsCoupons(member.ci);

      return { obs } as INewbestObsCoupons;
    } else if (dto.type === "app") {
      const member = await this.memberService.getMember(dto);
      const app = await this.couponRepository.getAppCouponsByMemberId(
        member.id
      );
      return app as IMembershipAppCoupon[];
    } else {
      throw new BadRequestException("Invalid coupon type");
    }
  }
  async getSubscriptionRewardRequests(dto: GetSubscriptionRewardRequestsDto) {
    return await this.couponRepository.findSubscriptionRewardRequestsByDate(
      dto.startAt,
      dto.endAt
    );
  }
}
