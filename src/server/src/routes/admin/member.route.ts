import { Router } from "express";
import { MemberController } from "../../controllers/admin/member.controller";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { NewbestApi } from "../../services/external/newbest.api";
import { AdminRepository } from "../../repositories/admin/admin.repository";
import { AccountApi } from "../../services/external/account.api";
const router = Router();
const memberService = new MemberService(
  new MemberRepository(),
  new AdminRepository(),
  new NewbestApi(),
  new AccountApi()
);
const memberController = new MemberController(memberService);

router.get("/", memberController.getMember);
router.get("/list", memberController.getMemberList);
router.get("/account", memberController.getMembersAccountInfo);
export const memberRoutes = router;
