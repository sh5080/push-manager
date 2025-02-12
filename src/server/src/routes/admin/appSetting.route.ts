import { Router } from "express";
import { AppSettingController } from "../../controllers/admin/appSetting.controller";
import { AppSettingService } from "../../services/admin/appSetting.service";
import { AppSettingRepository } from "../../repositories/admin/appSetting.repository";

const router = Router();
const appSettingService = new AppSettingService(new AppSettingRepository());
const appSettingController = new AppSettingController(appSettingService);

router.get("/", appSettingController.getAppSettings);

export const appSettingRoutes = router;
