import { Router } from "express";
import { MemberController } from "../../controllers/admin/member.controller";
import { MemberService } from "../../services/admin/member.service";
import { MemberRepository } from "../../repositories/admin/member.repository";

const router = Router();
const memberService = new MemberService(new MemberRepository());
const memberController = new MemberController(memberService);

router.get("/", memberController.getMemberByMemNo);

export const memberRoutes = router;
