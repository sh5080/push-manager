import { Router } from "express";
import { pushRoutes } from "./push.route";
import { identifyRoutes } from "./identify.route";

const router = Router();

router.use("/push", pushRoutes);
router.use("/identify", identifyRoutes);

export const apiRoutes = router;
