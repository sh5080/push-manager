import { Router } from "express";
import { PushController } from "../controllers/push.controller";
import { PushService } from "../services/push.service";
import { PushStsMsgRepository } from "../repositories/pushStsMsg.repository";
import { PushMasterRepository } from "../repositories/pushMaster.repository";
import { PushQueueRepository } from "../repositories/pushQueue.repository";

const router = Router();
const pushService = new PushService(
  new PushMasterRepository(),
  new PushStsMsgRepository(),
  new PushQueueRepository()
);
const pushController = new PushController(pushService);

router.post("/", pushController.createPushes);
router.get("/recent", pushController.getRecentPushes);
router.get("/scheduled", pushController.getScheduledPushes);
router.patch("/:campaignCode/status", pushController.updatePushStatus);
// router.get("/history", pushController.getPushHistory);
// router.get("/stats", pushController.getPushStats);
// router.get("/:campaignCode", pushController.getPushDetail);

export const pushRoutes = router;
