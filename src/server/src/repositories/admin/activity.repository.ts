import {
  GetActivityDto,
  IActivity,
  PaginatedResponse,
} from "@push-manager/shared";
import { drizzle } from "../../configs/db.config";
import { eq, sql, and, count, desc } from "drizzle-orm";
import { activity } from "../../db/migrations/schema";
export class ActivityRepository {
  constructor() {}
  async getActivity(
    dto: GetActivityDto
  ): Promise<PaginatedResponse<IActivity>> {
    const conditions = [];

    // kind가 제공된 경우 조건 추가
    if (dto.kind) {
      conditions.push(eq(activity.kind, dto.kind));
    }

    // memNo가 제공된 경우 조건 추가
    if (dto.memNo) {
      conditions.push(eq(sql`${activity.value}->>'memNo'`, dto.memNo));
    }

    // eventId가 제공된 경우 조건 추가
    if (dto.eventId) {
      conditions.push(eq(sql`${activity.value}->>'eventId'`, dto.eventId));
    }

    // eventData.level 조건 추가
    if (dto.level !== undefined) {
      conditions.push(
        eq(sql`${activity.value}->'eventData'->>'level'`, dto.level.toString())
      );
    }

    // eventData.submissions 조건 추가
    if (dto.submissions) {
      for (const [key, value] of Object.entries(dto.submissions)) {
        conditions.push(
          eq(
            sql`${activity.value}->'eventData'->'submissions'->>'${key}'`,
            value
          )
        );
      }
    }

    const page = dto.page || 1;
    const pageSize = dto.pageSize || 10;

    // 기본 쿼리 생성
    const query = drizzle
      .select()
      .from(activity)
      .limit(Number(pageSize))
      .offset(Number((page - 1) * pageSize))
      .orderBy(desc(activity.createdAt));

    // 조건이 있을 경우 where 절 추가
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    const [items, totalResult] = await Promise.all([
      query,
      drizzle
        .select({ count: count() })
        .from(activity)
        .where(and(...conditions))
        .execute(),
    ]);

    return {
      data: items as unknown as IActivity[],
      total: totalResult[0].count,
      page,
      pageSize,
      totalPages: Math.ceil(totalResult[0].count / pageSize),
    };
  }
}
