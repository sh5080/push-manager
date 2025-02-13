import { NextFunction, Request, Response } from "express";
import { GetMemberDto, validateDto } from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";

export class MemberController {
  constructor(private readonly memberService: IMemberService) {}

  getMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetMemberDto, req.query);
      const members = await this.memberService.getMember(dto);
      res.success(members);
    } catch (error) {
      next(error);
    }
  };
}
