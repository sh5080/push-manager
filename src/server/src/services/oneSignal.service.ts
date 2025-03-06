import { chunk } from "lodash";
import { OneSignalSendLog } from "../models/init-models";
import { pushConfig } from "../configs/push.config";
import { IOneSignalService } from "../interfaces/oneSignal.interface";
import { QueueService } from "./queue.service";
import { OneSignalPushDto } from "@push-manager/shared";
import { DatabaseLogger } from "../utils/logger.util";
import { sequelize } from "../configs/db.config";
import { QueryTypes } from "sequelize";

export class OneSignalService implements IOneSignalService {
  private readonly BATCH_SIZE = 2000;
  private readonly logger = DatabaseLogger.getInstance();

  constructor(private readonly queueService: QueueService) {
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
        const result = await this.sendOneSignalNotification(
          batch,
          title,
          content,
          subtitle,
          deepLink,
          sendDate
        );

        const log = await OneSignalSendLog.findByPk(logId);
        if (!log) throw new Error("로그를 찾을 수 없습니다.");

        const newCompletedCount = log.completedCount + batch.length;
        this.logger.logPushEvent("Batch progress", {
          logId,
          completedCount: newCompletedCount,
          totalCount: log.totalCount,
          context: "QueueProcessing",
        });

        await log.update({
          completedCount: newCompletedCount,
          lastProcessedId: batch[batch.length - 1],
          updatedAt: new Date(),
        });

        return result;
      } catch (error: any) {
        this.logger.logPushError("Batch processing failed", error, {
          logId,
          context: "QueueProcessing",
        });
        await OneSignalSendLog.update(
          {
            status: "F",
            errorMessage: error.message,
            updatedAt: new Date(),
          },
          { where: { id: logId } }
        );
        throw error;
      }
    });

    this.queueService.onPushCompleted(async (job) => {
      const { logId } = job.data;

      const log = await OneSignalSendLog.findByPk(logId);
      if (log && log.completedCount === log.totalCount) {
        this.logger.logPushEvent("All batches completed", {
          logId,
          totalProcessed: log.totalCount,
          context: "QueueCompleted",
        });

        await log.update({ status: "C", completedAt: new Date() });
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

  private async sendOneSignalNotification(
    identifyArray: string[],
    title: string,
    content: string,
    subtitle?: string,
    deepLink?: string,
    sendDate?: string
  ) {
    const response = await fetch(
      "https://api.onesignal.com/notifications?c=push",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Key ${pushConfig.oneSignal.apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          app_id: pushConfig.oneSignal.appId,
          include_aliases: { external_id: identifyArray },
          headings: { en: title },
          subtitle: subtitle ? { en: subtitle } : undefined,
          contents: { en: content },
          url: deepLink,
          target_channel: "push",
          send_after: sendDate,
        }),
      }
    );

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0]);
    }
    return result;
  }

  async sendPush(dto: OneSignalPushDto) {
    const { identifyArray } = dto;

    this.logger.logPushEvent("Starting push request", {
      totalIdentifiers: identifyArray.length,
      context: "PushRequest",
    });
    const [result] = await sequelize.query<{
      NEXTVAL: number;
    }>(`SELECT ONE_SIGNAL_SEND_LOG_SEQ.NEXTVAL FROM DUAL`, {
      type: QueryTypes.SELECT,
    });
    if (!result?.NEXTVAL) {
      throw new Error(
        `Failed to get next value for sequence: ONE_SIGNAL_SEND_LOG_SEQ`
      );
    }

    const sendLog = await OneSignalSendLog.create(
      {
        id: result.NEXTVAL,
        totalCount: identifyArray.length,
        completedCount: 0,
        status: "P",
        startedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { raw: true, mapToModel: true }
    );

    this.logger.logPushEvent("Created send log", {
      logId: sendLog.id,
      context: "PushRequest",
    });

    const batches = chunk(identifyArray, this.BATCH_SIZE);

    for (let i = 0; i < batches.length; i++) {
      this.logger.logPushEvent("Adding batch to queue", {
        logId: sendLog.id,
        batchNumber: i + 1,
        totalBatches: batches.length,
        context: "PushRequest",
      });

      await this.queueService.addPushJob({
        batch: batches[i],
        logId: sendLog.id,
        ...dto,
      });
    }
    return {
      message: "발송 작업이 큐에 등록되었습니다.",
      totalBatches: batches.length,
      logId: sendLog.id,
    };
  }

  async getSendLog(logId: number) {
    return await OneSignalSendLog.findByPk(logId);
  }

  async getIncompleteSendLogs() {
    return await OneSignalSendLog.findAll({
      where: { status: ["P", "F"] },
      order: [["createdAt", "DESC"]],
    });
  }
}
