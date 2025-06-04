import { Router } from "express";
import { AppSettingController } from "../../controllers/admin/appSetting.controller";
import { AppSettingService } from "../../services/admin/appSetting.service";
import { AppSettingRepository } from "../../repositories/admin/appSetting.repository";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { AccountApi } from "../../services/external/account.api";

const router = Router();
const appSettingService = new AppSettingService(
  new AppSettingRepository(),
  new MemberRepository(),
  new AccountApi()
);
const appSettingController = new AppSettingController(appSettingService);

router.post("/maintenance", appSettingController.createMaintenance);
router.put("/maintenance/:id", appSettingController.updateMaintenance);
router.put("/noticeBar", appSettingController.updateNoticeBar);
router.get("/activity", appSettingController.getActivity);
router.get("/", appSettingController.getAppSettings);

export const appSettingRoutes = router;
