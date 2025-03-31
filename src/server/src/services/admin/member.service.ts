import { BadRequestException, GetMemberDto } from "@push-manager/shared";
import { IMemberService } from "../../interfaces/admin/member.interface";
import { MemberRepository } from "../../repositories/admin/member.repository";
import { AdminRepository } from "../../repositories/admin/admin.repository";
import { NewbestApi } from "../external/newbest.api";

export class MemberService implements IMemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly adminRepository: AdminRepository,
    private readonly newbestApi: NewbestApi
  ) {}

  async getMember(dto: GetMemberDto) {
    const member = await this.memberRepository.findByDto(dto);

    if (!member) {
      throw new BadRequestException("Member not found");
    }

    const newbestInfo = await this.newbestApi.getMemberInfo(member.ci);
    return { ...member, newbestInfo: newbestInfo[0] };
  }

  async getAdminByEmail(email: string) {
    return await this.adminRepository.findByEmail(email);
  }
}
