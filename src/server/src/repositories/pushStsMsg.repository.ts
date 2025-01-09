import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { AppDataSource } from "../configs/db.config";
import { APP_CONFIG } from "../configs/app.config";
import { PushStsSendStatsDay } from "../entities/pushStsSendStatsDay.entity";
import { QueryRunner } from "typeorm";

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
  async getPushStsMsgDetail(
    queryRunner: QueryRunner,
    idx: number
  ): Promise<PushStsMsg | null> {
    return queryRunner.manager
      .getRepository(PushStsMsg)
      .createQueryBuilder("msg")
      .leftJoinAndSelect("msg.detail", "stats")
      .where("msg.IDX = :idx", { idx })
      .getOne();
  }
}
