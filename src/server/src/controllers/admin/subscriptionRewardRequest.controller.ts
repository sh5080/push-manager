import { NextFunction, Request, Response } from "express";
import {
  GetSubscriptionRewardRequestsDto,
  validateDto,
} from "@push-manager/shared";
import { ISubscriptionRewardRequestService } from "../../interfaces/admin/subscriptionRewardRequest.interface";

export class SubscriptionRewardRequestController {
  constructor(
    private readonly subscriptionRewardRequestService: ISubscriptionRewardRequestService
  ) {}

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
        await this.subscriptionRewardRequestService.getSubscriptionRewardRequests(
          dto
        );
      res.success(subscriptionRewardRequests);
    } catch (error) {
      next(error);
    }
  };
}
