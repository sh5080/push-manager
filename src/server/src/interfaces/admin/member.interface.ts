import { GetMemberDto, IMemberWithNewbestInfo } from "@push-manager/shared";

export interface IMemberService {
  getMember(dto: GetMemberDto): Promise<IMemberWithNewbestInfo>;
}
