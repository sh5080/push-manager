import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { AppDataSource } from "../configs/db.config";
import { APP_CONFIG } from "../configs/app.config";
import { TblPushstsmsg, TblPushstssendStatsDay } from "../models/init-models";
import { Op } from "sequelize";
import { TblPushstsmsgAlias } from "@push-manager/shared";

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

  async getPushStsMsgDetail(idx: string): Promise<TblPushstsmsg | null> {
    return await TblPushstsmsg.findOne({
      where: { idx },
      include: [
        {
          model: TblPushstssendStatsDay,
          as: TblPushstsmsgAlias.TblPushstssendStatsDay,
          required: false,
          where: {
            msgIdx: idx,
          },
          attributes: [
            "sent",
            "failed",
            "opened",
            "appdel",
            "sms",
            "deviceType",
            "startd",
          ],
        },
      ],
      raw: true,
      nest: true,
    });
  }

  async getRecentTargetPushes(limit: number = 10): Promise<TblPushstsmsg[]> {
    return await TblPushstsmsg.findAll({
      limit,
      order: [["idx", "DESC"]],
      raw: true,
      where: {
        appid: {
          [Op.in]: this.appIds,
        },
      },
    });
  }
}
