import { sequelize } from "../configs/db.config";
import { BaseRepository, paginationQuery } from "./base.repository";

import {
  IPushMasterWithMsg,
  StepEnum,
  PaginatedResponse,
} from "@push-manager/shared";
import { TblFpMaster } from "../models/TblFpMaster";
import { Transaction, QueryTypes } from "sequelize";

export class PushMasterRepository extends BaseRepository<TblFpMaster> {
  constructor() {
    super(TblFpMaster);
  }

  async getOnePushMaster(cmpncode: number): Promise<TblFpMaster> {
    const columns = Object.keys(TblFpMaster.getAttributes());
    const [result] = await TblFpMaster.findAll({
      where: { cmpncode },
      attributes: columns,
    });

    return result!;
  }

  async getLastCampaignCode(transaction: Transaction): Promise<TblFpMaster[]> {
    return await TblFpMaster.findAll({
      attributes: ["cmpncode"],
      order: [["cmpncode", "DESC"]],
      transaction,
    });
  }

  async createMasterRecord(
    transaction: Transaction,
    dto: {
      campaignCode: number;
      pMode: string;
      step: (typeof StepEnum)[keyof typeof StepEnum];
      startDate: string;
    }
  ) {
    const query = `
        INSERT INTO COKR_MBR_APP.TBL_FP_MASTER 
        (CMPNCODE, PMODE, STEP, RSTART_DATE) 
        VALUES 
        (:cmpncode, :pMode, :step, ${dto.startDate})
      `;

    return await sequelize.query(query, {
      replacements: {
        cmpncode: dto.campaignCode,
        pMode: dto.pMode,
        step: dto.step,
      },
      type: QueryTypes.INSERT,
      transaction,
    });
  }

  async updateMasterRecord(
    transaction: Transaction,
    dto: {
      campaignCode: number;
      step: (typeof StepEnum)[keyof typeof StepEnum];
      endDate: string;
    }
  ) {
    const query = `
    UPDATE COKR_MBR_APP.TBL_FP_MASTER 
    SET 
      REND_DATE = ${dto.endDate},
      STEP = :step
    WHERE CMPNCODE = :campaignCode
  `;
    return await sequelize.query(query, {
      replacements: {
        step: dto.step,
        campaignCode: dto.campaignCode,
      },
      type: QueryTypes.UPDATE,
      transaction,
    });
  }

  async getOnePushMasterWithMsg(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<IPushMasterWithMsg>> {
    const innerQuery = `
      SELECT DISTINCT
        m.CMPNCODE as "cmpncode",
        m.MSGIDX as "msgIdx",
        m.PMODE as "pMode",
        m.STEP as "step",
        m.FPSTEP as "fpStep",
        m.RSTART_DATE as "rStartDate",
        m.REND_DATE as "rEndDate",
        p.APPID as "appId",
        CASE 
          WHEN m.MSGIDX IS NOT NULL THEN p.TITLE 
          ELSE q.MSGTITLE 
        END as "title",
        CASE 
          WHEN m.MSGIDX IS NOT NULL THEN p.TMP_MESSAGE 
          ELSE q.MSGCONTENTS 
        END as "message"
      FROM COKR_MBR_APP.TBL_FP_MASTER m
      LEFT JOIN COKR_MBR_APP.TBL_PUSHSTSMSG p ON m.MSGIDX = p.IDX
      LEFT JOIN COKR_MBR_APP.TBL_FP_QUEUE q ON m.CMPNCODE = q.CMPNCODE
    `;

    return await paginationQuery<IPushMasterWithMsg>(
      sequelize,
      { page, pageSize, orderBy: "m.CMPNCODE", model: TblFpMaster },
      innerQuery
    );
  }
}
