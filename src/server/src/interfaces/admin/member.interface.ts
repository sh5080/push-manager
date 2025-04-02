import {
  GetMemberDto,
  GetMemberListDto,
  IMemberWithNewbestInfo,
} from "@push-manager/shared";
import { admin, member } from "../../db/schema";
export interface IMemberService {
  getMember(dto: GetMemberDto): Promise<IMemberWithNewbestInfo>;
  getMemberList(dto: GetMemberListDto): Promise<(typeof member.$inferSelect)[]>;
  getAdminByEmail(email: string): Promise<typeof admin.$inferSelect | null>;
}
