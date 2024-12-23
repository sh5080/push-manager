import { IPushService } from "../interfaces/push.interface";

import {
  CreatePushDto,
  GetRecentPushesDto,
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

export class PushService implements IPushService {
  constructor(
    private readonly pushMasterRepository: PushMasterRepository,
    private readonly pushStsMsgRepository: PushStsMsgRepository
  ) {}

  async createPushes(
    identifyArray: string[],
    dto: CreatePushDto,
    maxBatchSize: number = 1000
  ): Promise<number> {
    const now = new Date();
    const SENDDATE = dto.sendDateString;

    // if (!SENDDATE || isNaN(SENDDATE.getTime())) {
    //   throw new Error(`유효하지 않은 날짜 문자열: ${dto.sendDateString}`);
    // }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // 캠페인 코드 생성
      const lastCampaign =
        await this.pushMasterRepository.getLastCampaignCode();
      const campaignCode = (lastCampaign[0].CMPNCODE || 0) + 1;
      // 마스터 레코드 생성
      await this.pushMasterRepository.createMasterRecord({
        campaignCode,
        pmode: PModeEnum.CAMP,
        step: StepEnum.PENDING,
      });

      // 중복 제거된 식별자 처리
      const uniqueIdentifies = [...new Set(identifyArray)];
      const duplicateCount = identifyArray.length - uniqueIdentifies.length;

      if (duplicateCount > 0) {
        console.log(`중복된 식별자 ${duplicateCount}건이 발견되었습니다.`);
      }

      // 배치 처리
      for (let i = 0; i < uniqueIdentifies.length; i += maxBatchSize) {
        const batchIdentifies = uniqueIdentifies.slice(i, i + maxBatchSize);
        const nextQueueIdx = await this.pushStsMsgRepository.getNextQueueIdx();

        const pushBatch = this.createPushBatch(
          batchIdentifies,
          dto,
          nextQueueIdx,
          campaignCode,
          now,
          SENDDATE
        );

        await this.repository.insertPushBatch(queryRunner, pushBatch);
      }

      // 마스터 레코드 업데이트
      await this.repository.updateMasterRecord(queryRunner, {
        campaignCode,
        endDate: now,
        step: StepEnum.RESULT,
      });

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

  // private createPushBatch(
  //   identifies: string[],
  //   dto: ProdPushDto,
  //   startQueueIdx: number,
  //   campaignCode: number,
  //   now: Date,
  //   sendDate: Date
  // ): Partial<PushQueue>[] {
  //   return identifies.map((identify, index) => {
  //     const longTextParts = splitLongText(dto.MSGCONTENTS);

  //     return {
  //       QUEUEIDX: startQueueIdx + index,
  //       APPKEY: dto.APPKEY,
  //       APPSECRET: dto.APPSECRET,
  //       MSGTITLE: dto.MSGTITLE,
  //       SENDDATE: sendDate,
  //       MSGCONTENTS: longTextParts[1] ? "" : dto.MSGCONTENTS,
  //       IDENTIFY: identify,
  //       STEP: StepEnum.PENDING,
  //       PMODE: PModeEnum.CAMP,
  //       FNAME: dto.FNAME,
  //       SEND_STAT: dto.SEND_STAT,
  //       PLINK: dto.PLINK,
  //       CUSTOM_KEY_1:
  //         dto.CUSTOM_KEY_1 === "empty" ? "" : dto.CUSTOM_KEY_1 || "linktype",
  //       CUSTOM_VALUE_1:
  //         dto.CUSTOM_VALUE_1 === "empty" ? "" : dto.CUSTOM_VALUE_1 || "pushbox",
  //       CUSTOM_KEY_2: dto.CUSTOM_KEY_2,
  //       CUSTOM_VALUE_2: dto.CUSTOM_VALUE_2,
  //       CUSTOM_KEY_3: dto.CUSTOM_KEY_3 || "alt",
  //       CUSTOM_VALUE_3: dto.CUSTOM_VALUE_3,
  //       LABEL_CODE: dto.LABEL_CODE,
  //       BGCOLOR: dto.BGCOLOR,
  //       FONTCOLOR: dto.FONTCOLOR,
  //       AND_PRIORITY: dto.AND_PRIORITY,
  //       ISETIQUETTE: dto.ISETIQUETTE,
  //       ETIQUETTE_STIME: dto.ETIQUETTE_STIME,
  //       ETIQUETTE_ETIME: dto.ETIQUETTE_ETIME,
  //       OFB_TIME: dto.OFB_TIME,
  //       OPTAGREE: dto.OPTAGREE,
  //       PTAG: dto.PTAG,
  //       BESCHMODE: dto.BESCHMODE,
  //       LNGT_MESSAGE1: longTextParts[1] ? longTextParts[0] : "",
  //       LNGT_MESSAGE2: longTextParts[1] || "",
  //       LNGT_MESSAGE3: longTextParts[2] || "",
  //       LNGT_MESSAGE4: longTextParts[3] || "",
  //       WDATE: now,
  //       UDATE: now,
  //       CMPNCODE: campaignCode,
  //     };
  //   });
  // }

  async getRecentPushes(dto: GetRecentPushesDto): Promise<PushStsMsg[]> {
    try {
      const { appId } = APP_CONFIG[dto.targetMode];

      return await this.pushStsMsgRepository.getRecentTargetPushes(
        dto.limit,
        appId
      );
    } catch (error) {
      console.error("최근 푸시 조회 실패:", error);
      throw error;
    }
  }
}
