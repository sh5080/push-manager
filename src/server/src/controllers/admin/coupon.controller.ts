import { NextFunction, Request, Response } from "express";
import {
  GetSubscriptionRewardRequestsDto,
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
}
