import { PushMaster } from "../entities/pushMaster.entity";
import { AppDataSource } from "../configs/database";
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
    data: {
      campaignCode: number;
      endDate: () => string;
      step: (typeof StepEnum)[keyof typeof StepEnum];
    }
  ) {
    const masterRepository = queryRunner.manager.getRepository(PushMaster);
    return masterRepository.update(
      { cmpncode: data.campaignCode },
      {
        rend_date: data.endDate,
        step: data.step,
      }
    );
  }
}
