import {
  GetMemberDto,
  GetMemberListDto,
  IMemberGetRes,
  IMemberWithNewbestInfo,
} from "@push-manager/shared";
import { admin, member } from "../../db/schema";
export interface IMemberService {
  getMember(dto: GetMemberDto): Promise<IMemberWithNewbestInfo>;
  getMemberList(dto: GetMemberListDto): Promise<
    {
      memNo: string;
      createdAt: string;
    }[]
  >;
  getAdminByEmail(email: string): Promise<typeof admin.$inferSelect | null>;
  getMembersAccountInfo(
    memNoList: string[]
  ): Promise<{ bestshopNm?: string; address1?: string; address2?: string }[]>;
}
