import { IPushService } from "../interfaces/push.interface";

import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared/dtos/push.dto";

import { PushStsMsgRepository } from "../repositories/pushStsMsg.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { APP_CONFIG } from "../configs/app.config";
import { AppDataSource } from "../configs/database";
import { PushMasterRepository } from "../repositories/pushMaster.repository";
import {
  PModeEnum,
  StepEnum,
} from "@push-manager/shared/types/constants/pushQueue.const";
import { PushQueueRepository } from "../repositories/pushQueue.repository";
import { convertToSysdate } from "../utils/transform.util";
import { PushQueue } from "../entities/pushQueue.entity";
import { createPushBaseData } from "../utils/push.util";
import { CreateBasePushDto } from "../types/push.type";
import { QueryRunner } from "typeorm";

export class PushService implements IPushService {
  constructor(
    private readonly pushMasterRepository: PushMasterRepository,
    private readonly pushStsMsgRepository: PushStsMsgRepository,
    private readonly pushQueueRepository: PushQueueRepository
  ) {}

  async createPushes(
    dto: CreatePushDto,
    maxBatchSize: number = 1000
  ): Promise<number> {
    const now = () => "SYSDATE";
    const SENDDATE = convertToSysdate(dto.sendDateString!);
    const identifyArray = dto.identifyArray;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const lastCampaign = await this.pushMasterRepository.getLastCampaignCode(
        queryRunner
      );

      const campaignCode = lastCampaign[0].cmpncode + 1;
      await this.pushMasterRepository.createMasterRecord(queryRunner, {
        campaignCode,
        pmode: PModeEnum.CAMP,
        step: StepEnum.PENDING,
        startDate: SENDDATE,
      });
      const baseDto: CreateBasePushDto = {
        dto,
        campaignCode,
        sendDate: SENDDATE,
        now,
      };
      const baseData = createPushBaseData(baseDto);

      // 중복 제거된 식별자 처리
      const uniqueIdentifies = [...new Set(identifyArray)];
      const duplicateCount = identifyArray.length - uniqueIdentifies.length;

      if (duplicateCount > 0) {
        console.log(`중복된 식별자 ${duplicateCount}건이 발견되었습니다.`);
      }

      // 배치 처리
      for (let i = 0; i < uniqueIdentifies.length; i += maxBatchSize) {
        const batchIdentifies = uniqueIdentifies.slice(i, i + maxBatchSize);
        const nextQueueIdx = await this.pushQueueRepository.getNextQueueIdx(
          queryRunner
        );

        const pushBatch = this.createPushBatch(
          batchIdentifies,
          nextQueueIdx,
          baseData
        );

        await this.pushQueueRepository.insertPushBatch(queryRunner, pushBatch);
      }

      // isReady가 true일 때만 상태 업데이트
      if (dto.isReady) {
        await this.updateMasterStatus(
          queryRunner,
          campaignCode,
          StepEnum.TRANSACTION
        );
      }

      await queryRunner.commitTransaction();
      return campaignCode;
    } catch (error) {
      console.error("대량 푸시 데이터 삽입 중 오류 발생:", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private createPushBatch(
    identifies: string[],
    startQueueIdx: number,
    baseData: Partial<PushQueue>
  ): Partial<PushQueue>[] {
    return identifies.map((identify, index) => ({
      ...baseData,
      QUEUEIDX: startQueueIdx + index,
      IDENTIFY: identify,
      SENDDATE: () => `SYSDATE + 1/1440`,
    }));
  }
  async getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]> {
    try {
      const { appId } = APP_CONFIG[dto.targetMode];
      return await this.pushStsMsgRepository.getRecentTargetPushesByAppId(
        dto.limit,
        appId
      );
    } catch (error) {
      console.error("최근 푸시 조회 실패:", error);
      throw error;
    }
  }
  async updatePushStatus(
    dto: UpdatePushStatusDto
  ): Promise<UpdatePushStatusDto> {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
      await this.updateMasterStatus(queryRunner, dto.campaignCode, dto.step);
      return dto;
    } catch (error) {
      console.error("푸시 상태 업데이트 중 오류 발생:", error);
      throw error;
    }
  }
  private async updateMasterStatus(
    queryRunner: QueryRunner,
    campaignCode: number,
    step: (typeof StepEnum)[keyof typeof StepEnum]
  ): Promise<void> {
    await this.pushMasterRepository.updateMasterRecord(queryRunner, {
      campaignCode,
      endDate: () => "SYSDATE",
      step,
    });
  }
}
