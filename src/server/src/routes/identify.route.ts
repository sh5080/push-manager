import { Router } from "express";
import { IdentifyController } from "../controllers/identify.controller";
import { IdentifyService } from "../services/identify.service";
import { IdentifyRepository } from "../repositories/identify.repository";

const router = Router();
const identifyService = new IdentifyService(new IdentifyRepository());
const identifyController = new IdentifyController(identifyService);

router.get("/", identifyController.getIdentifies);
router.post("/", identifyController.createIdentify);
router.patch("/:idx", identifyController.updateIdentify);
router.delete("/:idx", identifyController.deleteIdentify);

export const identifyRoutes = router;
