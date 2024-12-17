import { AppDataSource } from "../configs/database";
import { PushQueue } from "../entities/pushQueue.entity";
import { PushMaster } from "../entities/pushMaster.entity";
import { QueryRunner } from "typeorm";
import { StepEnum } from "@push-manager/shared/types/constants/pushQueue.const";

export class PushRepository {
  private repository = AppDataSource.getRepository(PushQueue);

  async getNextCampaignCode(queryRunner: QueryRunner): Promise<number> {
    const masterRepository = queryRunner.manager.getRepository(PushMaster);
    const lastCampaign = await masterRepository
      .createQueryBuilder("master")
      .select("master.CMPNCODE", "CMPNCODE")
      .orderBy("master.CMPNCODE", "DESC")
      .getRawOne();

    return parseInt(lastCampaign?.CMPNCODE || "0") + 1;
  }

  async getNextQueueIdx(queryRunner: QueryRunner): Promise<number> {
    const result = await queryRunner.manager
      .getRepository(PushQueue)
      .createQueryBuilder("queue")
      .select("MAX(queue.QUEUEIDX)", "maxQueueIdx")
      .getRawOne<{ maxQueueIdx: number }>();

    return (result?.maxQueueIdx || 0) + 1;
  }

  async createMasterRecord(
    queryRunner: QueryRunner,
    data: {
      campaignCode: number;
      pmode: string;
      step: (typeof StepEnum)[keyof typeof StepEnum];
      startDate: Date;
    }
  ) {
    const masterRepository = queryRunner.manager.getRepository(PushMaster);
    return masterRepository.insert({
      CMPNCODE: data.campaignCode,
      PMODE: data.pmode,
      STEP: data.step,
      RSTART_DATE: data.startDate,
    });
  }

  async updateMasterRecord(
    queryRunner: QueryRunner,
    data: {
      campaignCode: number;
      endDate: Date;
      step: (typeof StepEnum)[keyof typeof StepEnum];
    }
  ) {
    const masterRepository = queryRunner.manager.getRepository(PushMaster);
    return masterRepository.update(
      { CMPNCODE: data.campaignCode },
      {
        REND_DATE: data.endDate,
        STEP: data.step,
      }
    );
  }

  async insertPushBatch(
    queryRunner: QueryRunner,
    pushBatch: Partial<PushQueue>[]
  ) {
    return queryRunner.manager.getRepository(PushQueue).insert(pushBatch);
  }

  async save(push: PushQueue): Promise<PushQueue> {
    return this.repository.save(push);
  }

  async findWithPagination(page: number, limit: number): Promise<PushQueue[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { WDATE: "DESC" },
    });
  }

  async findRecentPushes(limit: number): Promise<PushQueue[]> {
    return await AppDataSource.getRepository(PushQueue)
      .createQueryBuilder("push")
      .orderBy("push.WDATE", "DESC")
      .take(limit)
      .getMany();
  }

  async findPushHistory(
    skip: number,
    limit: number
  ): Promise<[PushQueue[], number]> {
    return await AppDataSource.getRepository(PushQueue)
      .createQueryBuilder("push")
      .orderBy("push.WDATE", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }

  async countPushesSince(date: Date): Promise<number> {
    return await AppDataSource.getRepository(PushQueue)
      .createQueryBuilder("push")
      .where("push.WDATE >= :date", { date })
      .getCount();
  }

  async countSuccessfulPushes(): Promise<number> {
    return await AppDataSource.getRepository(PushQueue)
      .createQueryBuilder("push")
      .where("push.STEP = :step", { step: StepEnum.RESULT })
      .getCount();
  }

  async countTotalPushes(): Promise<number> {
    return await AppDataSource.getRepository(PushQueue)
      .createQueryBuilder("push")
      .getCount();
  }

  async findPushByCampaignCode(
    campaignCode: number
  ): Promise<PushQueue | null> {
    return await AppDataSource.getRepository(PushQueue)
      .createQueryBuilder("push")
      .where("push.CMPNCODE = :campaignCode", { campaignCode })
      .getOne();
  }
}
