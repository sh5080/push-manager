import { BadRequestException, GetMemberDto } from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";
import { MemberRepository } from "../../repositories/admin/member.repository";

import { NewbestService } from "../external/newbest.service";
import { Member } from "@/src/models/admin/init-models";

export class MemberService implements IMemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly newbestService: NewbestService
  ) {}

  async getMember(dto: GetMemberDto) {
    const member = await this.memberRepository.findByDto(dto);

    if (!member) {
      throw new BadRequestException("Member not found");
    }

    const newbestInfo = await this.newbestService.getMemberInfo(member.ci);
    return { ...member, newbestInfo: newbestInfo[0] };
  }
}
