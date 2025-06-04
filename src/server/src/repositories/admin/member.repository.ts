import { BaseRepository } from "../base.repository";
import { Encrypted } from "../../decorators/encrypted.decorator";
import { Decrypted } from "../../decorators/decrypted.decorator";
import { Member } from "../../models/admin/init-models";
import {
  GetMemberDto,
  GetMemberListDto,
  Order,
  SortOption,
} from "@push-manager/shared";
import { drizzle } from "../../configs/db.config";
import { eq, sql, asc, desc, between, and, inArray } from "drizzle-orm";
import { activity, member } from "../../db/migrations/schema";

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
  async getMemberList(dto: GetMemberListDto) {
    const query = drizzle
      .select({ memNo: member.memNo, createdAt: member.createdAt })
      .from(member);

    if (dto.createdAt) {
      const targetDate = new Date(dto.createdAt);
      query.where(
        between(
          member.createdAt,
          targetDate.toISOString(),
          new Date("2025-04-02").toISOString()
        )
      );
    }

    const order = dto.order === Order.ASC ? asc : desc;
    const option =
      dto.option === SortOption.LATEST ? member.createdAt : member.name;

    return await query.orderBy(order(option));
    // 확인 위한 kst 테스트
    // const result = data.map((item) => {
    //   return {
    //     ...item,
    //     createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR", {
    //       year: "numeric",
    //       month: "2-digit",
    //       day: "2-digit",
    //       hour: "2-digit",
    //       minute: "2-digit",
    //       second: "2-digit",
    //     }),
    //   };
    // });
    // return result;
  }
  async getMemberListByActivity() {
    const query = drizzle
      .select({
        memNo: sql<string>`${activity.value}->>'memNo'`.as("memNo"),
        createdAt: activity.createdAt,
      })
      .from(activity)
      .where(
        and(
          eq(activity.kind, "EVENT_COMPLETED"),
          sql`${activity.value}->>'eventId' = '68b7a284-4b5d-4ece-97ae-626ba7145675'`
        )
      );

    return await query;
  }

  @Encrypted(["memNo"])
  @Decrypted(["memNo", "ci"])
  async findByMemNos(memNos: string[]) {
    return await drizzle
      .select()
      .from(member)
      .where(inArray(member.memNo, memNos));
  }
}
