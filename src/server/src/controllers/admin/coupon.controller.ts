import { NextFunction, Request, Response } from "express";
import {
  GetSubscriptionRewardRequestsDto,
  GetMemberCouponsDto,
  validateDto,
  GetCouponsDto,
} from "@push-manager/shared";
import { ICouponService } from "../../interfaces/admin/coupon.interface";

export class CouponController {
  constructor(private readonly couponService: ICouponService) {}

  getCoupons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetCouponsDto, req.query);
      const coupons = await this.couponService.getCoupons(dto);
      res.success(coupons);
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
}
