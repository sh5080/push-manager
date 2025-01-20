import { Router } from "express";
import { pushRoutes } from "./push.route";
import { identifyRoutes } from "./identify.route";
import { subscriptionRewardRequestRoutes } from "./admin/subscriptionReward.Request.route";

const router = Router();

router.use("/push", pushRoutes);
router.use("/identify", identifyRoutes);
router.use("/admin/subscription", subscriptionRewardRequestRoutes);

export const apiRoutes = router;
