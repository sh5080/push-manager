import { BaseRepository } from "../base.repository";
import { Encrypted } from "../../decorators/encrypted.decorator";
import { Decrypted } from "../../decorators/decrypted.decorator";
import { Member } from "../../models/admin/init-models";
import { GetMemberDto } from "@push-manager/shared";
import { drizzle } from "../../configs/db.config";
import { member } from "../../db/schema";
import { gte, asc } from "drizzle-orm";

export class MemberRepository extends BaseRepository<Member> {
  constructor() {
    super(Member);
  }

  @Encrypted()
  @Decrypted()
  async findByDto(dto: GetMemberDto) {
    return await Member.findOne({
      where: {
        ...(dto.memNo && { memNo: dto.memNo }),
        ...(dto.ci && { ci: dto.ci }),
        ...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
      },
      attributes: [
        "id",
        "memNo",
        "email",
        "name",
        "phoneNumber",
        "permissions",
        "unifyId",
        "ci",
      ],
      order: [["id", "asc"]],
      raw: true,
    });
  }

  @Decrypted()
  async getMemberList() {
    const targetDate = new Date("2025-04-01T01:00:00.000Z");
    const memberList = await drizzle
      .select({ memNo: member.memNo, createdAt: member.createdAt })
      .from(member)
      .where(gte(member.createdAt, targetDate.toISOString()))
      .orderBy(asc(member.createdAt));

    return memberList.map((member) => ({
      ...member,
      createdAt: new Date(
        new Date(member.createdAt).getTime() + 9 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    }));
  }
}
