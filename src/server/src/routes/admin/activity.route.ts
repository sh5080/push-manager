import { Router } from "express";
import { ActivityController } from "../../controllers/admin/activity.controller";
import { ActivityService } from "../../services/admin/activity.service";
import { ActivityRepository } from "../../repositories/admin/activity.repository";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { AccountApi } from "../../services/external/account.api";
import multer from "multer";

const router = Router();

const activityService = new ActivityService(
  new ActivityRepository(),
  new MemberRepository(),
  new AccountApi()
);
const activityController = new ActivityController(activityService);

const upload = multer({ dest: "public/" });

router.get("/", activityController.getActivity);
router.put(
  "/excel",
  upload.single("file"),
  activityController.updateActivityExcel
);

export const activityRoutes = router;
