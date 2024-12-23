import { AppDataSource } from "../configs/database";

import { BaseRepository } from "./base.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";

export class PushRepository extends BaseRepository<PushStsMsg> {
  private readonly pushStsMsg = AppDataSource.getRepository(PushStsMsg);

  // async getNextCampaignCode(queryRunner: QueryRunner): Promise<number> {
  //   const masterRepository = queryRunner.manager.getRepository(PushMaster);
  //   const lastCampaign = await masterRepository
  //     .createQueryBuilder("master")
  //     .select("master.CMPNCODE", "CMPNCODE")
  //     .orderBy("master.CMPNCODE", "DESC")
  //     .getRawOne();
  //   return parseInt(lastCampaign?.CMPNCODE || "0") + 1;
  // }
  // async getNextQueueIdx(queryRunner: QueryRunner): Promise<number> {
  //   const result = await queryRunner.manager
  //     .getRepository(PushQueue)
  //     .createQueryBuilder("queue")
  //     .select("MAX(queue.QUEUEIDX)", "maxQueueIdx")
  //     .getRawOne<{ maxQueueIdx: number }>();
  //   return (result?.maxQueueIdx || 0) + 1;
  // }
  // async createMasterRecord(
  //   queryRunner: QueryRunner,
  //   data: {
  //     campaignCode: number;
  //     pmode: string;
  //     step: (typeof StepEnum)[keyof typeof StepEnum];
  //     startDate: Date;
  //   }
  // ) {
  //   const masterRepository = queryRunner.manager.getRepository(PushMaster);
  //   return masterRepository.insert({
  //     CMPNCODE: data.campaignCode,
  //     PMODE: data.pmode,
  //     STEP: data.step,
  //     RSTART_DATE: data.startDate,
  //   });
  // }
  // async updateMasterRecord(
  //   queryRunner: QueryRunner,
  //   data: {
  //     campaignCode: number;
  //     endDate: Date;
  //     step: (typeof StepEnum)[keyof typeof StepEnum];
  //   }
  // ) {
  //   const masterRepository = queryRunner.manager.getRepository(PushMaster);
  //   return masterRepository.update(
  //     { CMPNCODE: data.campaignCode },
  //     {
  //       REND_DATE: data.endDate,
  //       STEP: data.step,
  //     }
  //   );
  // }
  // async insertPushBatch(
  //   queryRunner: QueryRunner,
  //   pushBatch: Partial<PushQueue>[]
  // ) {
  //   return queryRunner.manager.getRepository(PushQueue).insert(pushBatch);
  // }
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
