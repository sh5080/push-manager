import { PushMaster } from "../entities/pushMaster.entity";
import { AppDataSource } from "../configs/db.config";
import { BaseRepository } from "./base.repository";
import { QueryRunner } from "typeorm";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export class PushMasterRepository extends BaseRepository<PushMaster> {
  constructor() {
    super(AppDataSource, PushMaster);
  }

  async getLastCampaignCode(queryRunner: QueryRunner): Promise<PushMaster[]> {
    const queryBuilder = queryRunner.manager
      .getRepository(PushMaster)
      .createQueryBuilder("MASTER")
      .select("MASTER.CMPNCODE", "CMPNCODE")
      .orderBy("MASTER.CMPNCODE", "DESC");

    return this.execute(queryBuilder, async (qb) => {
      const result = await qb.getRawOne();
      return result ? [result] : [];
    });
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
      pmode: dto.pmode,
      step: dto.step,
      rstart_date: dto.startDate,
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
      { rend_date: dto.endDate, step: dto.step }
    );
  }
}
