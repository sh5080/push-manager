import { NextFunction, Request, Response } from "express";
import {
  GetSubscriptionRewardRequestsDto,
  GetMemberCouponsDto,
  validateDto,
} from "@push-manager/shared";
import { ICouponService } from "../../interfaces/admin/coupon.interface";

export class CouponController {
  constructor(private readonly couponService: ICouponService) {}

  getSubscriptionRewardRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(
        GetSubscriptionRewardRequestsDto,
        req.query
      );
      const subscriptionRewardRequests =
        await this.couponService.getSubscriptionRewardRequests(dto);
      res.success(subscriptionRewardRequests);
    } catch (error) {
      next(error);
    }
  };

  getMemberCoupons = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(GetMemberCouponsDto, req.query);
      const memberCoupons = await this.couponService.getMemberCoupons(dto);
      res.success(memberCoupons);
    } catch (error) {
      next(error);
    }
  };
}
