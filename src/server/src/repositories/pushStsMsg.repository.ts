import { BaseRepository, paginationQuery } from "./base.repository";
import { APP_CONFIG } from "../configs/app.config";
import {
  TblDeviceToken,
  TblDeviceTokenOption,
  TblOpeninfo,
  TblPushstsmsg,
  TblPushstssend,
  TblPushstssendStatsDay,
} from "../models/init-models";
import { Sequelize, Op } from "sequelize";
import {
  GetTargetPushesDto,
  IPushStsMsgWithDetail,
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

  async getPushStsMsgDetail(idx: string): Promise<IPushStsMsgWithDetail> {
    const [pushMsg, statsDetails, sendResults, openinfo] = await Promise.all([
      TblPushstsmsg.findOne({
        where: { idx },
        raw: true,
        mapToModel: true,
      }),
      TblPushstssendStatsDay.findAll({
        where: { msgIdx: idx },
        attributes: ["deviceType", "sent", "failed", "opened", "appdel", "sms"],
        raw: true,
        mapToModel: true,
      }),
      TblPushstssend.findAll({
        where: { msgIdx: idx },
        attributes: [
          "idx",
          "msgIdx",
          "result",
          "resultMsg",
          "sendDate",
          "opened",
          "deviceType",
          "tokenIdx",
        ],
        include: [
          {
            model: TblDeviceToken,
            as: "deviceToken",
            required: false,
            attributes: [
              "idx",
              "activity",
              "activityProc",
              "appId",
              "deviceType",
              "optAgree",
              "token",
              "uDate",
              "wDate",
            ],
          },
          {
            model: TblDeviceTokenOption,
            as: "tokenOption",
            required: false,
            attributes: [
              "appVersion",
              "osVersion",
              "country",
              "identify",
              "appIntVersion",
              "sdkVersion",
              "timezone",
            ],
          },
        ],

        raw: true,
        nest: true,
        mapToModel: true,
      }),
      TblOpeninfo.findAll({
        where: { msgIdx: idx },
        attributes: ["openDate", "oMode", "tokenIdx"],
        raw: true,
        mapToModel: true,
      }),
    ]);

    return {
      ...pushMsg,
      detail: statsDetails,
      result: sendResults,
      openinfo: openinfo,
    } as unknown as IPushStsMsgWithDetail;
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
      order: [["sendDate", "DESC"]],
      raw: true,
    });
  }

  async getTargetPushes(
    dto: GetTargetPushesDto,
    appIds?: string[]
  ): Promise<PaginatedResponse<TblPushstsmsg>> {
    const { page, pageSize, startDate, endDate, step, title } = dto;

    const pushMessages = await TblPushstsmsg.findAll({
      where: Sequelize.literal(`
      IDX IN (
        SELECT IDX FROM (
          SELECT A.*, ROWNUM AS RN FROM (
            SELECT IDX FROM TBL_PUSHSTSMSG 
            WHERE APPID IN (:appIds) AND
            SENDDATE BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD') 
            AND TO_DATE(:endDate, 'YYYY-MM-DD')
            ${step ? "AND STEP = :step" : ""}
            ${title ? "AND TITLE LIKE :title" : ""}
            ORDER BY IDX DESC
          ) A WHERE ROWNUM <= :endRow
        ) WHERE RN >= :startRow
      )
    `),
      replacements: {
        appIds: appIds ? appIds : this.appIds,
        startDate,
        endDate,
        startRow: (page - 1) * pageSize + 1,
        endRow: page * pageSize,
        ...(step ? { step } : {}),
        ...(title ? { title: `%${title}%` } : {}),
      },
      order: [["idx", "DESC"]],
      raw: true,
      nest: true,
      subQuery: false,
      mapToModel: true,
    });

    const total = await TblPushstsmsg.count({
      where: {
        appId: { [Op.in]: appIds ? appIds : this.appIds },
        sendDate: {
          [Op.between]: [startDate, endDate],
        },
        ...(step ? { step } : {}),
        ...(title
          ? {
              title: { [Op.like]: `%${title}%` },
            }
          : {}),
      },
    });

    return {
      data: pushMessages,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
