import { NextFunction, Request, Response } from "express";
import { GetMemberByMemNoDto, validateDto } from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";

export class MemberController {
  constructor(private readonly memberService: IMemberService) {}

  getMemberByMemNo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = await validateDto(GetMemberByMemNoDto, req.query);
      const members = await this.memberService.getMemberByMemNo(dto);
      res.success(members);
    } catch (error) {
      next(error);
    }
  };
}
