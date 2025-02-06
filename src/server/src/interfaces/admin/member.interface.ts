import { GetMemberByMemNoDto } from "@push-manager/shared";
import { Member } from "../../models/admin/Member";

export interface IMemberService {
  getMemberByMemNo(dto: GetMemberByMemNoDto): Promise<Member>;
}
