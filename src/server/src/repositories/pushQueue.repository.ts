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
      SELECT 
        QUEUEIDX as "queueidx",
        IDENTIFY as "identify",
        MSGTITLE as "msgtitle",
        MSGCONTENTS as "msgcontents",
        STEP as "step",
        SENDDATE as "senddate",
        RESULTDATE as "resultdate"
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
    return await TblFpQueue.findAll({
      where: { cmpncode },
      attributes: ["identify"],
      raw: true,
    });
  }
}
