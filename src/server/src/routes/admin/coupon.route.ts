import { Router } from "express";
import { CouponController } from "../../controllers/admin/coupon.controller";
import { CouponService } from "../../services/admin/coupon.service";
import { CouponRepository } from "../../repositories/admin/coupon.repository";
import { NewbestApi } from "../../services/external/newbest.api";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { AdminRepository } from "../../repositories/admin/admin.repository";

const router = Router();
const couponService = new CouponService(
  new CouponRepository(),
  new NewbestApi(),
  new MemberService(
    new MemberRepository(),
    new AdminRepository(),
    new NewbestApi()
  )
);
const couponController = new CouponController(couponService);

router.get("/", couponController.getCoupons);
router.get("/member", couponController.getMemberCoupons);
router.get("/subscription", couponController.getSubscriptionRewardRequests);

export const couponRoutes = router;
