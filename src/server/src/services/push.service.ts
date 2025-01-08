import { IPushService } from "../interfaces/push.interface";

import {
  CreatePushDto,
  GetRecentPushesDto,
  UpdatePushStatusDto,
} from "@push-manager/shared/dtos/push.dto";

import { PushStsMsgRepository } from "../repositories/pushStsMsg.repository";
import { PushStsMsg } from "../entities/pushStsMsg.entity";
import { APP_CONFIG } from "../configs/app.config";
import { AppDataSource } from "../configs/db.config";
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
import { queryRunnerCreation } from "../utils/transaction.util";
import { PushMaster } from "../entities/pushMaster.entity";

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

    return queryRunnerCreation(async (queryRunner) => {
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

        const pushBatch = await this.createPushBatch(
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

      return campaignCode;
    });
  }

  async getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]> {
    return queryRunnerCreation(async () => {
      const { appId } = APP_CONFIG[dto.targetMode];
      // return this.pushStsMsgRepository.getRecentTargetPushesByAppId(
      //   dto.limit,
      //   appId
      // );
      return this.pushStsMsgRepository.getRecentTargetPushes(dto.limit);
    }, false);
  }

  async getScheduledPushes(): Promise<PushMaster[]> {
    return queryRunnerCreation(async (queryRunner) => {
      return this.pushMasterRepository.getMasterRecords(queryRunner);
    }, false);
  }
  async updatePushStatus(
    dto: UpdatePushStatusDto
  ): Promise<UpdatePushStatusDto> {
    return queryRunnerCreation(async (queryRunner) => {
      await this.updateMasterStatus(queryRunner, dto.campaignCode, dto.step);
      return dto;
    }, false);
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

  private async createPushBatch(
    identifies: string[],
    startQueueIdx: number,
    baseData: Partial<PushQueue>
  ): Promise<Partial<PushQueue>[]> {
    return identifies.map((identify, index) => ({
      ...baseData,
      queueIdx: startQueueIdx + index,
      identify,
      sendDate: () => `SYSDATE + 1/1440`,
    }));
  }
}
