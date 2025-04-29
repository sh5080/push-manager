import { sequelize } from "../configs/db.config";
import { BaseRepository, paginationQuery } from "./base.repository";
import { GetPushQueuesDto, PaginatedResponse, UpdateQueueDto } from "@push-manager/shared";
import {
  TblFpQueue,
  TblFpQueueCreationAttributes,
  TblFpQueueAttributes,
  TblFpMaster,
} from "../models/init-models";
import { Optional, QueryTypes, Transaction } from "sequelize";

export class PushQueueRepository extends BaseRepository<TblFpQueue> {
  constructor() {
    super(TblFpQueue);
  }

  async getNextQueueIdx(transaction: Transaction): Promise<number> {
    const result = await sequelize.query<{ NEXTVAL: number }>(
      "SELECT COKR_MBR_APP.SEQ_FP_QUEUE.NEXTVAL AS NEXTVAL FROM DUAL",
      { type: QueryTypes.SELECT, transaction }
    );
    return result[0].NEXTVAL;
  }

  async insertPushBatch(
    transaction: Transaction,
    pushBatch: Optional<TblFpQueueCreationAttributes, "queueIdx">[]
  ) {
    try {
      return await this.bulkCreateWithSeq({
        values: pushBatch,
        fields: Object.keys(TblFpQueue.getAttributes()).filter(
          (attr) => attr.toLowerCase() !== "queueIdx"
        ),
        pkField: "queueIdx",
        sequenceName: "SEQ_FP_QUEUE",
        transaction,
      });
    } catch (error: any) {
      console.error("Error in bulk insert:", {
        message: error.message,
        stack: error.stack,
        batchSize: pushBatch.length,
      });
      throw error;
    }
  }

  async getPushQueues(
    dto: GetPushQueuesDto
  ): Promise<PaginatedResponse<TblFpQueue>> {
    const { cmpncode, page, pageSize } = dto;
    const innerQuery = `
      SELECT *
      FROM COKR_MBR_APP.TBL_FP_QUEUE
      WHERE CMPNCODE = :cmpncode
    `;

    return await paginationQuery<TblFpQueue>(
      sequelize,
      {
        page,
        pageSize,
        orderBy: "QUEUEIDX",
        orderDirection: "DESC",
        model: TblFpQueue,
        replacements: { cmpncode },
      },
      innerQuery
    );
  }

  async getAllPushQueues(cmpncode: number): Promise<TblFpQueue[]> {
    return await TblFpQueue.findAll({
      where: { cmpncode },
      raw: true,
    });
  }

  async addToQueue(identifies: string[], queueData: TblFpQueue): Promise<void> {
    const { queueIdx, ...queueDataWithoutId } = queueData;

    const values = identifies.map((identify: string) => ({
      ...queueDataWithoutId,
      identify,
    }));

    const attributes = Object.keys(
      TblFpQueue.getAttributes()
    ) as (keyof TblFpQueueAttributes)[];

    await this.bulkCreateWithSeq<TblFpQueue>({
      values: values as TblFpQueue[],
      fields: attributes,
      pkField: "QUEUEIDX",
      sequenceName: "SEQ_FP_QUEUE",
    });

    return;
  }

  async getQueueCount(cmpncode: number): Promise<number> {
    return await TblFpQueue.count({
      where: { cmpncode },
    });
  }

  async updateQueue(
    transaction: Transaction,
    cmpncode: number,
    dto: UpdateQueueDto
  ): Promise<void> {
    await TblFpQueue.update(
      {
        msgTitle: dto.title,
        msgContents: dto.content,
      },
      { where: { cmpncode }, transaction }
    );
  }
  async deleteQueue(cmpncode: number, transaction: Transaction): Promise<void> {
    await TblFpMaster.destroy({ where: { cmpncode }, transaction });
    await TblFpQueue.destroy({ where: { cmpncode }, transaction });
  }
}
