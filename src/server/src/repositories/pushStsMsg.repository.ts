import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { AppDataSource } from "../configs/db.config";
import { APP_CONFIG } from "../configs/app.config";
import { PushStsSendStatsDay } from "../entities/pushStsSendStatsDay.entity";

export class PushStsMsgRepository extends BaseRepository<PushStsMsg> {
  constructor() {
    super(AppDataSource, PushStsMsg);
  }

  async getRecentTargetPushesByAppId(
    limit: number = 10,
    appId: string
  ): Promise<PushStsMsg[]> {
    const query = `
      SELECT * FROM (
        SELECT * FROM TBL_PUSHSTSMSG
        WHERE APPID = :1
        ORDER BY IDX DESC
      ) WHERE ROWNUM <= :2
    `;

    return this.executeRaw(query, [appId, limit]);
  }

  async getRecentTargetPushes(limit: number = 10): Promise<PushStsMsg[]> {
    const query = `
      SELECT * FROM (
        SELECT * FROM TBL_PUSHSTSMSG
        WHERE APPID IN (:1, :2, :3)
        ORDER BY IDX DESC
      ) WHERE ROWNUM <= :4
    `;

    const appIds = [
      APP_CONFIG[0].appId,
      APP_CONFIG[1].appId,
      APP_CONFIG[2].appId,
    ];

    return this.executeRaw(query, [...appIds, limit]);
  }
  async getPushStsMsgDetail(idx: number): Promise<PushStsSendStatsDay[]> {
    const query = `
      SELECT * FROM TBL_PUSHSTSSEND_STATS_DAY
      WHERE MSG_IDX = :1
    `;

    // BaseRepository의 executeRaw를 오버라이드하여 PushStsSendStatsDay 타입으로 변환
    const results = await this.executeRaw(query, [idx]);
    return results.map((result) => {
      const stats = new PushStsSendStatsDay();
      Object.assign(stats, result);
      return stats;
    });
  }
}
