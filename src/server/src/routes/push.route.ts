import { Router } from "express";
import { PushController } from "../controllers/push.controller";
import { PushService } from "../services/push.service";
import { PushRepository } from "../repositories/push.repository";

const router = Router();
const pushService = new PushService(new PushRepository());
const pushController = new PushController(pushService);

router.post("/bulk", pushController.createBulkPush);
router.get("/recent", pushController.getRecentPushes);
router.get("/history", pushController.getPushHistory);
router.get("/stats", pushController.getPushStats);
router.get("/:campaignCode", pushController.getPushDetail);

export const pushRoutes = router;
