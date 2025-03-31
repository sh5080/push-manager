import { Router } from "express";
import { pushRoutes } from "./push.route";
import { identifyRoutes } from "./identify.route";
import { appSettingRoutes } from "./admin/appSetting.route";
import { couponRoutes } from "./admin/coupon.route";
import { memberRoutes } from "./admin/member.route";
import { imageRoutes } from "./image.route";
import { authRoutes } from "./admin/auth.route";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.use("/auth", authRoutes);
router.use("/push", authMiddleware.authenticate, pushRoutes);

router.use("/identify", authMiddleware.authenticate, identifyRoutes);

router.use("/admin/appSetting", authMiddleware.authenticate, appSettingRoutes);
router.use("/admin/coupon", authMiddleware.authenticate, couponRoutes);
router.use("/admin/member", authMiddleware.authenticate, memberRoutes);
router.use("/image", authMiddleware.authenticate, imageRoutes);
export const apiRoutes = router;
