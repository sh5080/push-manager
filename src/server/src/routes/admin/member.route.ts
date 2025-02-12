import { Router } from "express";
import { MemberController } from "../../controllers/admin/member.controller";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { NewbestService } from "../../services/external/newbest.service";

const router = Router();
const memberService = new MemberService(
  new MemberRepository(),
  new NewbestService()
);
const memberController = new MemberController(memberService);

router.get("/", memberController.getMember);

export const memberRoutes = router;
