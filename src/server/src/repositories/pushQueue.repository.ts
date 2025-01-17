import { AppDataSource, sequelize } from "../configs/db.config";
import { BaseRepository, paginationQuery } from "./base.repository";
import { PushQueue } from "../entities/pushQueue.entity";
import { QueryRunner } from "typeorm";
import { GetPushQueuesDto, PaginatedResponse } from "@push-manager/shared";
import { TblFpQueue } from "../models/init-models";

export class PushQueueRepository extends BaseRepository<TblFpQueue> {
  constructor() {
    super(AppDataSource, TblFpQueue, TblFpQueue);
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

  async getPushQueues(
    dto: GetPushQueuesDto
  ): Promise<PaginatedResponse<TblFpQueue>> {
    const { cmpncode, page, pageSize } = dto;
    const innerQuery = `
      SELECT *
      FROM COKR_MBR_APP.TBL_FP_QUEUE
      WHERE CMPNCODE = ${cmpncode}
    `;

    return await paginationQuery<TblFpQueue>(
      sequelize,
      {
        page,
        pageSize,
        orderBy: "QUEUEIDX",
        orderDirection: "DESC",
        model: TblFpQueue,
      },
      innerQuery
    );
  }

  async getAllPushQueues(cmpncode: number): Promise<TblFpQueue[]> {
    const attributes = Object.keys(TblFpQueue.getAttributes());
    return await TblFpQueue.findAll({
      where: { cmpncode },
      attributes,
      raw: true,
    });
  }

  async addToQueue(identifies: string[], queueData: TblFpQueue): Promise<void> {
    const { queueidx, ...queueDataWithoutId } = queueData;

    const values = identifies.map((identify: string) => ({
      ...queueDataWithoutId,
      identify,
    }));

    const attributes = Object.keys(TblFpQueue.getAttributes()).filter(
      (attr) => attr.toLowerCase() !== "queueidx"
    );

    await this.bulkCreateWithSeq<TblFpQueue>({
      values,
      fields: attributes,
      pkField: "QUEUEIDX",
      sequenceName: "SEQ_FP_QUEUE",
    });

    return;
  }

  async getQueueCount(cmpncode: number): Promise<number> {
    return await TblFpQueue.count({ where: { cmpncode } });
  }
}
