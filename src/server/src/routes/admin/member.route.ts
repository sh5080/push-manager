import { Router } from "express";
import { MemberController } from "../../controllers/admin/member.controller";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { NewbestApi } from "../../services/external/newbest.api";
import { AdminRepository } from "../../repositories/admin/admin.repository";
const router = Router();
const memberService = new MemberService(
  new MemberRepository(),
  new AdminRepository(),
  new NewbestApi()
);
const memberController = new MemberController(memberService);

router.get("/", memberController.getMember);
router.get("/list", memberController.getMemberList);

export const memberRoutes = router;
