import { Router } from "express";
import { pushRoutes } from "./push.route";
import { identifyRoutes } from "./identify.route";
import { appSettingRoutes } from "./admin/appSetting.route";
import { couponRoutes } from "./admin/coupon.route";
import { memberRoutes } from "./admin/member.route";
import { imageRoutes } from "./image.route";
import { authRoutes } from "./admin/auth.route";
import { functionRoutes } from "./admin/function.route";
import { authMiddleware } from "../middlewares/auth.middleware";
import { activityRoutes } from "./admin/activity.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/push", pushRoutes);

router.use("/identify", authMiddleware.authenticate, identifyRoutes);

router.use("/admin/appSetting", authMiddleware.authenticate, appSettingRoutes);
router.use("/admin/coupon", authMiddleware.authenticate, couponRoutes);
router.use("/admin/member", authMiddleware.authenticate, memberRoutes);
router.use("/admin/activity", authMiddleware.authenticate, activityRoutes);
router.use("/admin/function", authMiddleware.authenticate, functionRoutes);
router.use("/image", authMiddleware.authenticate, imageRoutes);
export const apiRoutes = router;
