import { BaseRepository, paginationQuery } from "./base.repository";
import { APP_CONFIG } from "../configs/app.config";
import { TblPushstsmsg, TblPushstssendStatsDay } from "../models/init-models";
import { Sequelize } from "sequelize";
import {
  GetTargetPushesDto,
  IPushStsMsg,
  PaginatedResponse,
} from "@push-manager/shared";
import { sequelize } from "../configs/db.config";
import { PushMsgStats } from "../types/push.type";

export class PushStsMsgRepository extends BaseRepository<TblPushstsmsg> {
  private appIds: string[];

  constructor() {
    super(TblPushstsmsg);
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

  async getTargetPushes(
    dto: GetTargetPushesDto,
    appIds?: string[]
  ): Promise<PaginatedResponse<TblPushstsmsg & PushMsgStats>> {
    const { page, pageSize, startDate, endDate } = dto;

    const innerQuery = `
      SELECT m.*,
             '{"sent":' || NVL(s.sent, 0) || 
             ',"failed":' || NVL(s.failed, 0) || 
             ',"opened":' || NVL(s.opened, 0) || '}' as "stats"
      FROM COKR_MBR_APP.TBL_PUSHSTSMSG m
      LEFT JOIN (
        SELECT msg_idx,
               SUM(sent) as sent,
               SUM(failed) as failed,
               SUM(opened) as opened
        FROM COKR_MBR_APP.TBL_PUSHSTSSEND_STATS_DAY
        GROUP BY msg_idx
      ) s ON m.idx = s.msg_idx
      WHERE m.APPID IN (:appIds)
      AND TO_CHAR(m.SENDDATE, 'YYYY-MM-DD') 
        BETWEEN TO_CHAR(TO_DATE(:startDate, 'YYYY-MM-DD'), 'YYYY-MM-DD')
        AND TO_CHAR(TO_DATE(:endDate, 'YYYY-MM-DD'), 'YYYY-MM-DD')
    `;

    const result = await paginationQuery<TblPushstsmsg & PushMsgStats>(
      sequelize,
      {
        page,
        pageSize,
        orderBy: "IDX",
        orderDirection: "DESC",
        model: TblPushstsmsg,
        replacements: {
          appIds: appIds ? appIds : this.appIds,
          startDate,
          endDate,
        },
      },
      innerQuery
    );

    result.data = result.data.map((item: any) => {
      try {
        const statsStr = item.get("stats");
        const parsedStats = statsStr ? JSON.parse(statsStr) : null;
        return {
          ...item.dataValues,
          stats: parsedStats,
        };
      } catch (e) {
        console.error("Failed to parse stats:", e);
        return {
          ...item.dataValues,
          stats: null,
        };
      }
    });

    return result;
  }
}
