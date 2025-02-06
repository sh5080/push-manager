import { BadRequestException, GetMemberByMemNoDto } from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { Member } from "@/src/models/admin/Member";

export class MemberService implements IMemberService {
  constructor(private readonly memberRepository: MemberRepository) {}
  async getMemberByMemNo(dto: GetMemberByMemNoDto): Promise<Member> {
    const member = await this.memberRepository.findByMemNo(dto);
    if (!member) {
      throw new BadRequestException("Member not found");
    }
    return member;
  }
}
