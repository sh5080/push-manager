import { BadRequestException, GetMemberByMemNoDto } from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";
import { MemberRepository } from "../../repositories/admin/member.repository";

import { NewbestService } from "../external/newbest.service";

export class MemberService implements IMemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly newbestService: NewbestService
  ) {}

  async getMemberByMemNo(dto: GetMemberByMemNoDto) {
    const member = await this.memberRepository.findByMemNo(dto);
    if (!member) {
      throw new BadRequestException("Member not found");
    }
    const newbestInfo = await this.newbestService.getMemberInfo(member.ci);
    return { ...member, newbestInfo };
  }
}
