import { Router } from "express";
import { AuthController } from "../../controllers/admin/auth.controller";
import { AuthService } from "../../services/admin/auth.service";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { AdminRepository } from "../../repositories/admin/admin.repository";
import { NewbestApi } from "../../services/external/newbest.api";
import { RedisService } from "../../services/redis.service";
import { DatabaseLogger } from "../../utils/logger.util";

const router = Router();
const authService = new AuthService(
  new MemberService(
    new MemberRepository(),
    new AdminRepository(),
    new NewbestApi()
  ),
  RedisService.getInstance(),
  DatabaseLogger.getInstance()
);
const authController = new AuthController(authService);

router.post("/login", authController.login);

export const authRoutes = router;
