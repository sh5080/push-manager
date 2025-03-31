import { GetMemberDto, IMemberWithNewbestInfo } from "@push-manager/shared";
import { admin } from "@/src/db/schema";
export interface IMemberService {
  getMember(dto: GetMemberDto): Promise<IMemberWithNewbestInfo>;
  getAdminByEmail(email: string): Promise<typeof admin.$inferSelect | null>;
}
