import { chunk } from "lodash";
import { IOneSignalService } from "../interfaces/oneSignal.interface";
import { QueueService } from "./queue.service";
import {
  OneSignalException,
  OneSignalMessageIdDto,
  OneSignalOutcomeDto,
  OneSignalPushDto,
  OneSignalSubscriptionDto,
  OneSignalTemplateDto,
  OneSignalUserDto,
} from "@push-manager/shared";
import { DatabaseLogger } from "../utils/logger.util";
import { OneSignalSendLogRepository } from "../repositories/oneSignalSendLog.repository";
import { OneSignalApi } from "./external/oneSignal.api";

export class OneSignalService implements IOneSignalService {
  private readonly BATCH_SIZE = 2000;
  private readonly logger = DatabaseLogger.getInstance();

  constructor(
    private readonly queueService: QueueService,
    private readonly oneSignalApi: OneSignalApi,
    private readonly oneSignalSendLogRepository: OneSignalSendLogRepository
  ) {
    this.setupQueueProcessors();
  }

  private setupQueueProcessors() {
    this.queueService.setupPushProcessor(async (job) => {
      const { batch, logId, title, content, subtitle, deepLink, sendDate } =
        job.data;

      this.logger.logPushEvent("Starting batch process", {
        logId,
        batchSize: batch.length,
        context: "QueueProcessing",
      });

      try {
        const result = await this.oneSignalApi.sendNotification(
          batch,
          title,
          content,
          subtitle,
          deepLink,
          sendDate
        );

        const log = await this.oneSignalSendLogRepository.findById(logId);

        if (!log) throw new Error("로그를 찾을 수 없습니다.");

        const newCompletedCount = log.currentCount + batch.length;
        this.logger.logPushEvent("Batch progress", {
          logId,
          currentCount: newCompletedCount,
          totalCount: log.totalCount,
          context: "QueueProcessing",
        });

        await this.oneSignalSendLogRepository.update(logId, {
          oneSignalPushId: result.id,
          currentCount: newCompletedCount,
          lastExternalId: batch[batch.length - 1],
        });

        return result;
      } catch (error: any) {
        this.logger.logPushError("Batch processing failed", error, {
          logId,
          context: "QueueProcessing",
        });

        if (error instanceof OneSignalException) {
          await this.oneSignalSendLogRepository.createErrorLog({
            pushSendLogId: logId,
            message: error.message,
          });
        }

        throw error;
      }
    });

    this.queueService.onPushCompleted(async (job) => {
      const { logId } = job.data;

      const log = await this.oneSignalSendLogRepository.findById(logId);

      if (log && log.currentCount === log.totalCount) {
        this.logger.logPushEvent("All batches completed", {
          logId,
          totalProcessed: log.totalCount,
          context: "QueueCompleted",
        });

        await this.oneSignalSendLogRepository.update(logId, {
          status: "COMPLETED",
        });
      }
    });

    this.queueService.onPushFailed(async (job, error) => {
      this.logger.logPushError("Push job failed", error, {
        logId: job.data.logId,
        batchSize: job.data.batch.length,
        context: "QueueFailed",
      });
    });
  }

  async sendPush(dto: OneSignalPushDto) {
    const { identifyArray } = dto;

    this.logger.logPushEvent("Starting push request", {
      totalIdentifiers: identifyArray.length,
      context: "PushRequest",
    });

    const sendLog = await this.oneSignalSendLogRepository.create({
      totalCount: identifyArray.length,
      currentCount: 0,
      status: "PENDING",
    });

    this.logger.logPushEvent("Created send log", {
      logId: sendLog[0].id,
      context: "PushRequest",
    });

    const batches = chunk(identifyArray, this.BATCH_SIZE);

    for (let i = 0; i < batches.length; i++) {
      this.logger.logPushEvent("Adding batch to queue", {
        logId: sendLog[0].id,
        batchNumber: i + 1,
        totalBatches: batches.length,
        context: "PushRequest",
      });

      await this.queueService.addPushJob({
        batch: batches[i],
        logId: sendLog[0].id,
        ...dto,
      });
    }

    return {
      message: "발송 작업이 큐에 등록되었습니다.",
      totalBatches: batches.length,
      logId: sendLog[0].id,
    };
    // api테스트
    // const result = await this.oneSignalApi.sendNotification(
    //   identifyArray,
    //   dto.title,
    //   dto.content,
    //   dto.subtitle,
    //   dto.deepLink,
    //   dto.sendDate
    // );
    // console.log("testResult: ", result);
    // return {
    //   message: "발송 작업이 큐에 등록되었습니다.",
    //   totalBatches: 1,
    //   logId: 1,
    // };
  }

  async getSendLog(logId: number) {
    return await this.oneSignalSendLogRepository.findById(logId);
  }

  async getIncompleteSendLogs() {
    return await this.oneSignalSendLogRepository.findIncomplete();
  }

  async getOutcomes(dto: OneSignalOutcomeDto) {
    const { outcomeNames, aggregation, timeRange, platforms, attribution } =
      dto;

    // aggregations이 제공된 경우, 이름과 집계 타입 조합
    let formattedOutcomeNames = outcomeNames;

    if (aggregation && aggregation.length > 0) {
      formattedOutcomeNames = outcomeNames.map((name) =>
        OneSignalApi.formatOutcomeName(name, aggregation)
      );
    }

    return await this.oneSignalApi.getOutcomes(
      formattedOutcomeNames,
      timeRange,
      platforms,
      attribution
    );
  }
  async createTemplate(dto: OneSignalTemplateDto) {
    const { name, contents } = dto;
    return await this.oneSignalApi.createTemplate(name, contents);
  }
  async getUser(externalId: string) {
    return await this.oneSignalApi.getUser(externalId);
  }
  async getCsv(dto: OneSignalMessageIdDto) {
    return await this.oneSignalApi.getCsv(dto.messageId);
  }
  async getMessage(dto: OneSignalMessageIdDto) {
    return await this.oneSignalApi.getMessage(dto.messageId);
  }
  async createUser(dto: OneSignalUserDto) {
    const { externalId } = dto;
    return await this.oneSignalApi.createUser(externalId);
  }
  async createSubscription(dto: OneSignalSubscriptionDto): Promise<string> {
    const { type, externalId, token } = dto;
    return await this.oneSignalApi.createSubscription(type, externalId, token);
  }
}
