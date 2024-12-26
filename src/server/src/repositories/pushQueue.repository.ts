import { AppDataSource } from "../configs/database";

import { BaseRepository } from "./base.repository";
import { PushQueue } from "../entities/pushQueue.entity";
import { QueryRunner } from "typeorm";

export class PushQueueRepository extends BaseRepository<PushQueue> {
  constructor() {
    super(AppDataSource, PushQueue);
  }

  async getNextQueueIdx(queryRunner: QueryRunner): Promise<number> {
    const result = await queryRunner.manager
      .getRepository(PushQueue)
      .query("SELECT COKR_MBR_APP.SEQ_FP_QUEUE.NEXTVAL AS NEXTVAL FROM DUAL");
    return result[0].NEXTVAL;
  }

  async insertPushBatch(
    queryRunner: QueryRunner,
    pushBatch: Partial<PushQueue>[]
  ) {
    return queryRunner.manager.getRepository(PushQueue).insert(pushBatch);
  }
  // async countSuccessfulPushes(): Promise<number> {
  //   return await AppDataSource.getRepository(PushQueue)
  //     .createQueryBuilder("push")
  //     .where("push.STEP = :step", { step: StepEnum.RESULT })
  //     .getCount();
  // }
  // async countTotalPushes(): Promise<number> {
  //   return await AppDataSource.getRepository(PushQueue)
  //     .createQueryBuilder("push")
  //     .getCount();
  // }
  // async findPushByCampaignCode(
  //   campaignCode: number
  // ): Promise<PushQueue | null> {
  //   return await AppDataSource.getRepository(PushQueue)
  //     .createQueryBuilder("push")
  //     .where("push.CMPNCODE = :campaignCode", { campaignCode })
  //     .getOne();
  // }
  // async findPushHistory(page: number = 1, limit: number = 10) {
  //   const skip = (page - 1) * limit;
  //   return await AppDataSource.getRepository(PushQueue)
  //     .createQueryBuilder("push")
  //     .skip(skip)
  //     .take(limit)
  //     .getMany();
  // }
  // async findPushStats() {
  //   return await AppDataSource.getRepository(PushQueue)
  //     .createQueryBuilder("push")
  //     .getMany();
  // }
  // async findPushDetail(campaignCode: number) {
  //   return await AppDataSource.getRepository(PushQueue)
  //     .createQueryBuilder("push")
  //     .where("push.CMPNCODE = :campaignCode", { campaignCode })
  //     .getOne();
  // }
}
