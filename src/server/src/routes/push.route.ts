import { Router } from "express";
import { PushController } from "../controllers/push.controller";
import { PushService } from "../services/push.service";
import { PushStsMsgRepository } from "../repositories/pushStsMsg.repository";
import { PushMasterRepository } from "../repositories/pushMaster.repository";
import { PushQueueRepository } from "../repositories/pushQueue.repository";
import { OneSignalService } from "../services/oneSignal.service";
import { QueueService } from "../services/queue.service";

const router = Router();
const pushService = new PushService(
  new PushMasterRepository(),
  new PushStsMsgRepository(),
  new PushQueueRepository()
);
const oneSignalService = new OneSignalService(new QueueService());
const pushController = new PushController(pushService, oneSignalService);

router.post("/", pushController.createPushes);
router.get("/", pushController.getTargetPushes);
router.get("/recent", pushController.getRecentPushes);
router.get("/scheduled", pushController.getScheduledPushes);

router.get("/detail/:idx", pushController.getPushStsMsgDetail);
router.get("/queue/:cmpncode", pushController.getPushQueues);
router.post("/queue/:cmpncode", pushController.addToQueue);
router.patch("/queue/confirm", pushController.confirmPushQueue);

router.get("/token", pushController.validateToken);
router.post("/oneSignal", pushController.sendOneSignalPush);

export const pushRoutes = router;
