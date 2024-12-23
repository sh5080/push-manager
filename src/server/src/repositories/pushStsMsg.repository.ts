import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { AppDataSource } from "../configs/database";

export class PushStsMsgRepository extends BaseRepository<PushStsMsg> {
  constructor() {
    super(AppDataSource, PushStsMsg);
  }

  async getRecentTargetPushes(
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
}
