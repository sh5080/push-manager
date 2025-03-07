import { eq, or, desc } from "drizzle-orm";
import { drizzle } from "../configs/db.config";
import { pushSendLog, pushSendLogStatus } from "../db/schema";

export class OneSignalSendLogRepository {
  /**
   * 로그 ID로 조회
   */
  async findById(logId: number) {
    const logs = await drizzle
      .select()
      .from(pushSendLog)
      .where(eq(pushSendLog.id, logId));

    return logs.length > 0 ? logs[0] : null;
  }

  /**
   * 새 로그 생성
   */
  async create(data: {
    totalCount: number;
    currentCount: number;
    status: (typeof pushSendLogStatus.enumValues)[number];
  }) {
    return await drizzle
      .insert(pushSendLog)
      .values({
        totalCount: data.totalCount,
        currentCount: data.currentCount,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();
  }

  /**
   * 로그 업데이트
   */
  async update(
    logId: number,
    data: Partial<{
      currentCount: number;
      status: (typeof pushSendLogStatus.enumValues)[number];
      pushId: string;
      lastProcessedId: string;
      errorMessage: string;
    }>
  ) {
    return await drizzle
      .update(pushSendLog)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(pushSendLog.id, logId))
      .returning();
  }

  /**
   * 미완료 로그 조회
   */
  async findIncomplete() {
    return await drizzle
      .select()
      .from(pushSendLog)
      .where(
        or(eq(pushSendLog.status, "PENDING"), eq(pushSendLog.status, "FAILED"))
      )
      .orderBy(desc(pushSendLog.createdAt));
  }
}
