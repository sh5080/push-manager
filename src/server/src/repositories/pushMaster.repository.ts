import { PushMaster } from "../entities/pushMaster.entity";
import { AppDataSource } from "../configs/database";
import { BaseRepository } from "./base.repository";
import { QueryRunner } from "typeorm";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export class PushMasterRepository extends BaseRepository<PushMaster> {
  constructor() {
    super(AppDataSource, PushMaster);
  }

  async getLastCampaignCode(): Promise<PushMaster[]> {
    const queryBuilder = this.getRepository(PushMaster)
      .createQueryBuilder("master")
      .select("master.CMPNCODE", "CMPNCODE")
      .orderBy("master.CMPNCODE", "DESC");

    return this.execute(queryBuilder, async (qb) => {
      const result = await qb.getRawOne();
      return result ? [result] : [];
    });
  }

  async createMasterRecord(dto: {
    campaignCode: number;
    pmode: string;
    step: (typeof StepEnum)[keyof typeof StepEnum];
  }) {
    const result = await this.getRepository(PushMaster).insert({
      CMPNCODE: dto.campaignCode,
      PMODE: dto.pmode,
      STEP: dto.step,
      RSTART_DATE: new Date(),
    });
  }
}
