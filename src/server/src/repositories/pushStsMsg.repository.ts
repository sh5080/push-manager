import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";

export class PushStsMsgRepository extends BaseRepository<PushStsMsg> {
  async getRecentTargetPushes(
    limit: number = 10,
    appId: string
  ): Promise<PushStsMsg[]> {
    const query = `
      SELECT *
      FROM (
        SELECT push.*
        FROM TBL_PUSHSTSMSG push
        WHERE push.APPID = :1
        ORDER BY push.IDX DESC
      ) ordered_push
      WHERE ROWNUM <= :2
    `;

    return this.executeRawQuery<PushStsMsg[]>(query, [appId, limit]);
  }

  async getTargetPushCount(): Promise<number> {
    const queryBuilder = this.getRepository(PushStsMsg)
      .createQueryBuilder("push")
      .select("COUNT(*)", "count");

    return this.execute(queryBuilder, (qb) => qb.getCount());
  }
}
