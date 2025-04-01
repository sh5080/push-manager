import { GetMemberDto, IMemberWithNewbestInfo } from "@push-manager/shared";
import { admin } from "../../db/schema";
export interface IMemberService {
  getMember(dto: GetMemberDto): Promise<IMemberWithNewbestInfo>;
  getMemberList(): Promise<{ memNo: string; createdAt: string }[]>;
  getAdminByEmail(email: string): Promise<typeof admin.$inferSelect | null>;
}
