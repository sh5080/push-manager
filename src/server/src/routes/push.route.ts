import { Router } from "express";
import { PushController } from "../controllers/push.controller";

const router = Router();
const pushController = new PushController();

router.post("/bulk", pushController.createBulkPush);
router.get("/recent", pushController.getRecentPushes);
router.get("/history", pushController.getPushHistory);
router.get("/stats", pushController.getPushStats);
router.get("/:campaignCode", pushController.getPushDetail);

export const pushRoutes = router;
