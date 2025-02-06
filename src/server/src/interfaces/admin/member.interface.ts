import {
  GetMemberByMemNoDto,
  IMemberWithNewbestInfo,
} from "@push-manager/shared";

export interface IMemberService {
  getMemberByMemNo(dto: GetMemberByMemNoDto): Promise<IMemberWithNewbestInfo>;
}
