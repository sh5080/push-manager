import { Router } from "express";
import { CouponController } from "../../controllers/admin/coupon.controller";
import { CouponService } from "../../services/admin/coupon.service";
import { SubscriptionRewardRequestRepository } from "../../repositories/admin/subscriptionRewardRequest.repository";

const router = Router();
const couponService = new CouponService(
  new SubscriptionRewardRequestRepository()
);
const couponController = new CouponController(couponService);

router.get("/subscription", couponController.getSubscriptionRewardRequests);

export const couponRoutes = router;
