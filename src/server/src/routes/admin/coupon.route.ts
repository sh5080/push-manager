import { Router } from "express";
import { CouponController } from "../../controllers/admin/coupon.controller";
import { CouponService } from "../../services/admin/coupon.service";
import { SubscriptionRewardRequestRepository } from "../../repositories/admin/subscriptionRewardRequest.repository";
import { NewbestService } from "../../services/external/newbest.service";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";

const router = Router();
const couponService = new CouponService(
  new SubscriptionRewardRequestRepository(),
  new NewbestService(),
  new MemberService(new MemberRepository(), new NewbestService())
);
const couponController = new CouponController(couponService);

router.get("/subscription", couponController.getSubscriptionRewardRequests);
router.get("/member", couponController.getMemberCoupons);

export const couponRoutes = router;
