import { IPushService } from "../interfaces/push.interface";

import {
  AddToQueueDto,
  BadRequestException,
  CreatePushDto,
  GetPushQueuesDto,
  GetRecentPushesDto,
  IPushMasterWithMsg,
  PaginatedResponse,
  ConfirmPushQueueDto,
  GetTargetPushesDto,
  IPushStsMsgWithDetail,
} from "@push-manager/shared";

import { PushStsMsgRepository } from "../repositories/pushStsMsg.repository";
import { PushMasterRepository } from "../repositories/pushMaster.repository";
import { PModeEnum, StepEnum } from "@push-manager/shared";
import { PushQueueRepository } from "../repositories/pushQueue.repository";
import { convertToSysdate } from "../utils/transform.util";
import { createPushBaseData } from "../utils/push.util";
import { CreateBasePushDto } from "../types/push.type";
import { TblPushstsmsg } from "../models/TblPushstsmsg";
import {
  TblFpMaster,
  TblFpQueue,
  TblFpQueueCreationAttributes,
} from "../models/init-models";
import { sequelize } from "../configs/db.config";
import { Optional, Transaction } from "sequelize";
import { APP_CONFIG } from "../configs/app.config";

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
    const now = "SYSDATE";
    const SENDDATE = convertToSysdate(dto.sendDateString!);
    const identifyArray = dto.identifyArray;

    const result = await sequelize.transaction(async (transaction) => {
      // 마지막 캠페인 코드 조회
      const lastCampaign = await this.pushMasterRepository.getLastCampaignCode(
        transaction
      );
      const campaignCode = lastCampaign[0].cmpncode + 1;

      // 마스터 레코드 생성
      await this.pushMasterRepository.createMasterRecord(transaction, {
        campaignCode,
        pMode: PModeEnum.CAMP,
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
          transaction
        );

        const pushBatch = await this.createPushBatch(
          batchIdentifies,
          nextQueueIdx,
          baseData
        );

        await this.pushQueueRepository.insertPushBatch(transaction, pushBatch);
      }

      // isReady가 true일 때만 상태 업데이트
      if (dto.isReady) {
        await this.updateMasterStatus(
          transaction,
          campaignCode,
          StepEnum.TRANSACTION
        );
      }

      return campaignCode;
    });

    return result;
  }

  async getRecentPushes(dto: GetRecentPushesDto): Promise<TblPushstsmsg[]> {
    return this.pushStsMsgRepository.getRecentTargetPushes(dto.limit);
  }

  async getTargetPushes(
    dto: GetTargetPushesDto
  ): Promise<PaginatedResponse<TblPushstsmsg>> {
    const { targetMode } = dto;
    if (targetMode) {
      const { appId } = APP_CONFIG[targetMode];
      return this.pushStsMsgRepository.getTargetPushes(dto, [appId]);
    }
    return this.pushStsMsgRepository.getTargetPushes(dto);
  }

  async getScheduledPushes(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<IPushMasterWithMsg>> {
    return this.pushMasterRepository.getOnePushMasterWithMsg(page, pageSize);
  }

  async getPushStsMsgDetail(
    idx: string
  ): Promise<IPushStsMsgWithDetail | null> {
    return this.pushStsMsgRepository.getPushStsMsgDetail(idx);
  }

  async getPushQueues(
    dto: GetPushQueuesDto
  ): Promise<PaginatedResponse<TblFpQueue>> {
    return this.pushQueueRepository.getPushQueues(dto);
  }

  async addToQueue(
    dto: AddToQueueDto,
    maxBatchSize: number = 1000
  ): Promise<number> {
    const { identifies, cmpncode } = dto;
    const existingQueues = await this.pushQueueRepository.getAllPushQueues(
      cmpncode
    );

    if (!existingQueues.length) {
      throw new BadRequestException("예약된 대기열이 없습니다.");
    }

    // 기존 대기열의 identify 목록
    const existingIdentifies = new Set(
      existingQueues.map((queue) => queue.identify)
    );

    // 1. 입력값 중복 제거
    const uniqueIdentifies = [...new Set(identifies)];
    const duplicateCount = identifies.length - uniqueIdentifies.length;

    if (duplicateCount > 0) {
      console.log(
        `입력값 중 중복된 식별자 ${duplicateCount}건이 제외되었습니다.`
      );
    }

    // 2. 기존 대기열과 중복되는 값 제거
    const newIdentifies = uniqueIdentifies.filter(
      (id) => !existingIdentifies.has(id)
    );
    const queueDuplicateCount = uniqueIdentifies.length - newIdentifies.length;

    if (queueDuplicateCount > 0) {
      console.log(
        `기존 대기열과 중복된 식별자 ${queueDuplicateCount}건이 제외되었습니다.`
      );
    }
    if (!newIdentifies.length) {
      throw new BadRequestException(
        "기존 등록된 식별자이거나 예약된 대기열이 없습니다."
      );
    }
    // 배치 처리
    for (let i = 0; i < newIdentifies.length; i += maxBatchSize) {
      const batchIdentifies = newIdentifies.slice(i, i + maxBatchSize);
      await this.pushQueueRepository.addToQueue(
        batchIdentifies,
        existingQueues[0]
      );
    }

    return newIdentifies.length;
  }

  async confirmPushQueue(dto: ConfirmPushQueueDto): Promise<TblFpMaster> {
    const existingMaster = await this.pushMasterRepository.getOnePushMaster(
      dto.campaignCode
    );

    if (!existingMaster) {
      throw new BadRequestException("예약된 푸시가 없습니다.");
    }

    if (existingMaster.step !== StepEnum.PENDING) {
      throw new BadRequestException("예약 확정 가능한 상태의 푸시가 아닙니다.");
    }

    await sequelize.transaction(async (transaction) => {
      await this.updateMasterStatus(transaction, dto.campaignCode, dto.step);
    });
    existingMaster.step = dto.step;
    return existingMaster;
  }

  async getOnePushMaster(cmpncode: number): Promise<TblFpMaster> {
    return await this.pushMasterRepository.getOnePushMaster(cmpncode);
  }

  private async updateMasterStatus(
    transaction: Transaction,
    campaignCode: number,
    step: (typeof StepEnum)[keyof typeof StepEnum]
  ): Promise<void> {
    await this.pushMasterRepository.updateMasterRecord(transaction, {
      campaignCode,
      endDate: "SYSDATE",
      step,
    });
  }

  private async createPushBatch(
    identifies: string[],
    startQueueIdx: number,
    baseData: Optional<TblFpQueueCreationAttributes, "queueIdx">
  ): Promise<Optional<TblFpQueueCreationAttributes, "queueIdx">[]> {
    return identifies.map((identify, index) => ({
      ...baseData,
      queueIdx: startQueueIdx + index,
      identify,
    }));
  }
}
