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
router.get("/", pushController.getTargetPushes);
router.get("/recent", pushController.getRecentPushes);
router.get("/scheduled", pushController.getScheduledPushes);

router.get("/detail/:idx", pushController.getPushStsMsgDetail);
router.get("/queue/:cmpncode", pushController.getPushQueues);
router.post("/queue/:cmpncode", pushController.addToQueue);
router.patch("/queue/confirm", pushController.confirmPushQueue);
router.patch("/queue/:cmpncode", pushController.updateQueue);
router.delete("/queue/:cmpncode", pushController.deleteQueue);

router.get("/token", pushController.validateToken);

export const pushRoutes = router;
