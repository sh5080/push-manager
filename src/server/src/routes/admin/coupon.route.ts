import { Router } from "express";
import { CouponController } from "../../controllers/admin/coupon.controller";
import { CouponService } from "../../services/admin/coupon.service";
import { CouponRepository } from "../../repositories/admin/coupon.repository";
import { NewbestService } from "../../services/external/newbest.service";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";

const router = Router();
const couponService = new CouponService(
  new CouponRepository(),
  new NewbestService(),
  new MemberService(new MemberRepository(), new NewbestService())
);
const couponController = new CouponController(couponService);

router.get("/", couponController.getCoupons);
router.get("/member", couponController.getMemberCoupons);
router.get("/subscription", couponController.getSubscriptionRewardRequests);

export const couponRoutes = router;
