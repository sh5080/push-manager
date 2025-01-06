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
    const result = await queryRunner.manager
      .getRepository(PushMaster)
      .createQueryBuilder("MASTER")
      .select("MASTER.cmpncode", "cmpncode")
      .orderBy("MASTER.cmpncode", "DESC")
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

  async getMasterRecords(queryRunner: QueryRunner): Promise<PushMaster[]> {
    return queryRunner.manager
      .getRepository(PushMaster)
      .createQueryBuilder("master")
      .leftJoinAndSelect("master.pushStsMsg", "msg")
      .orderBy("master.CMPNCODE", "DESC")
      .getMany();
  }
}
