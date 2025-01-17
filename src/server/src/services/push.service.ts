import { IPushService } from "../interfaces/push.interface";

import {
  AddToQueueDto,
  BadRequestException,
  CreatePushDto,
  GetPushQueuesDto,
  GetRecentPushesDto,
  IPushMasterWithMsg,
  IPushStsMsg,
  PaginatedResponse,
  UpdatePushStatusDto,
} from "@push-manager/shared";

import { PushStsMsgRepository } from "../repositories/pushStsMsg.repository";
import { PushMasterRepository } from "../repositories/pushMaster.repository";
import { PModeEnum, StepEnum } from "@push-manager/shared";
import { PushQueueRepository } from "../repositories/pushQueue.repository";
import { convertToSysdate } from "../utils/transform.util";
import { PushQueue } from "../entities/pushQueue.entity";
import { createPushBaseData } from "../utils/push.util";
import { CreateBasePushDto } from "../types/push.type";
import { QueryRunner } from "typeorm";
import { queryRunnerCreation } from "../utils/transaction.util";
import { TblPushstsmsg } from "../models/TblPushstsmsg";
import { TblFpQueue } from "../models/init-models";

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

  async getRecentPushes(dto: GetRecentPushesDto): Promise<TblPushstsmsg[]> {
    return this.pushStsMsgRepository.getRecentTargetPushes(dto.limit);
  }

  async getScheduledPushes(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<IPushMasterWithMsg>> {
    return this.pushMasterRepository.getPushMasterWithMsg(page, pageSize);
  }

  async getPushStsMsgDetail(idx: string): Promise<IPushStsMsg | null> {
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
