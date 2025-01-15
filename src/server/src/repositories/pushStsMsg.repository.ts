import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { AppDataSource } from "../configs/db.config";
import { APP_CONFIG } from "../configs/app.config";
import { TblPushstsmsg, TblPushstssendStatsDay } from "../models/init-models";
import { Sequelize } from "sequelize";
import { IPushStsMsg } from "@push-manager/shared";

export class PushStsMsgRepository extends BaseRepository<PushStsMsg> {
  private appIds: string[];

  constructor() {
    super(AppDataSource, PushStsMsg);
    this.appIds = [
      APP_CONFIG[0].appId,
      APP_CONFIG[1].appId,
      APP_CONFIG[2].appId,
    ];
  }

  async getPushStsMsgDetail(idx: string): Promise<IPushStsMsg> {
    const [pushMsg, statsDetails] = await Promise.all([
      TblPushstsmsg.findOne({
        where: { idx },
        raw: true,
      }),
      TblPushstssendStatsDay.findAll({
        where: { msgIdx: idx },
        attributes: ["deviceType", "sent", "failed", "opened", "appdel", "sms"],
        raw: true,
      }),
    ]);

    return { ...pushMsg, detail: statsDetails } as unknown as IPushStsMsg;
  }

  async getRecentTargetPushes(limit: number = 10): Promise<TblPushstsmsg[]> {
    return await TblPushstsmsg.findAll({
      where: Sequelize.literal(`
        IDX IN (
          SELECT IDX FROM (
            SELECT IDX FROM TBL_PUSHSTSMSG 
            WHERE APPID IN (:appIds)
            ORDER BY SENDDATE DESC
          ) WHERE ROWNUM <= :limit
        )
      `),
      replacements: {
        limit,
        appIds: this.appIds,
      },
      order: [["senddate", "DESC"]],
      raw: true,
    });
  }
}
