import { Router } from "express";
import { pushRoutes } from "./push.route";
import { identifyRoutes } from "./identify.route";
import { appSettingRoutes } from "./admin/appSetting.route";
import { couponRoutes } from "./admin/coupon.route";
import { memberRoutes } from "./admin/member.route";

const router = Router();

router.use("/push", pushRoutes);
router.use("/identify", identifyRoutes);

router.use("/admin/appSetting", appSettingRoutes);
router.use("/admin/coupon", couponRoutes);
router.use("/admin/member", memberRoutes);
export const apiRoutes = router;
