import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { AppDataSource } from "../configs/db.config";

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
      SELECT * FROM TBL_PUSHSTSMSG
      ORDER BY IDX DESC
      LIMIT :1
    `;
    return this.executeRaw(query, [limit]);
  }
}
