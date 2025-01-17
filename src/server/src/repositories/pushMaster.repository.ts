import { PushMaster } from "../entities/pushMaster.entity";
import { AppDataSource, sequelize } from "../configs/db.config";
import { BaseRepository, paginationQuery } from "./base.repository";
import { QueryRunner } from "typeorm";
import {
  IPushMasterWithMsg,
  StepEnum,
  PaginatedResponse,
} from "@push-manager/shared";
import { TblFpMaster } from "../models/TblFpMaster";

export class PushMasterRepository extends BaseRepository<TblFpMaster> {
  constructor() {
    super(AppDataSource, TblFpMaster);
  }

  async getLastCampaignCode(queryRunner: QueryRunner): Promise<TblFpMaster[]> {
    const result = await queryRunner.manager
      .getRepository(TblFpMaster)
      .createQueryBuilder("MASTER")
      .select("MASTER.CMPNCODE", "CMPNCODE")
      .orderBy("MASTER.CMPNCODE", "DESC")
      .getRawOne();

    return result ? [result] : [];
  }

  async createMasterRecord(
    queryRunner: QueryRunner,
    dto: {
      campaignCode: number;
      pmode: string;
      step: (typeof StepEnum)[keyof typeof StepEnum];
      startDate: () => string;
    }
  ) {
    const masterRepository = queryRunner.manager.getRepository(PushMaster);
    return masterRepository.insert({
      cmpncode: dto.campaignCode,
      pMode: dto.pmode,
      step: dto.step,
      rStartDate: dto.startDate,
    });
  }

  async updateMasterRecord(
    queryRunner: QueryRunner,
    dto: {
      campaignCode: number;
      step: (typeof StepEnum)[keyof typeof StepEnum];
      endDate: () => string;
    }
  ) {
    const masterRepository = queryRunner.manager.getRepository(PushMaster);
    return masterRepository.update(
      { cmpncode: dto.campaignCode },
      { rEndDate: dto.endDate, step: dto.step }
    );
  }

  async getPushMasterWithMsg(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<IPushMasterWithMsg>> {
    const innerQuery = `
      SELECT 
        m.CMPNCODE as "cmpncode",
        m.MSGIDX as "msgidx",
        m.PMODE as "pmode",
        m.STEP as "step",
        m.RSTART_DATE as "rstartDate",
        m.REND_DATE as "rendDate",
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
