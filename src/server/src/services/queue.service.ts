import Queue from "bull";
import { RedisService } from "./redis.service";
import { PushNotificationJobData } from "../types/push.type";
import { DatabaseLogger } from "../utils/logger.util";

export class QueueService {
  private pushQueue: Queue.Queue<PushNotificationJobData>;
  private readonly logger = DatabaseLogger.getInstance();

  constructor() {
    const redisClient = RedisService.getInstance().getClient();

    this.pushQueue = new Queue("push-notifications", {
      createClient: () => redisClient,
    });

    this.pushQueue.on("error", (error) => {
      this.logger.logPushError("Queue error", error, { context: "Queue" });
    });
  }

  async addPushJob(data: PushNotificationJobData) {
    try {
      return await this.pushQueue.add(data, {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      });
    } catch (error) {
      this.logger.logPushError("Failed to add job to queue", error as Error, {
        context: "Queue",
        data,
      });
      throw error;
    }
  }

  setupPushProcessor(
    processor: (job: Queue.Job<PushNotificationJobData>) => Promise<any>
  ) {
    this.pushQueue.process(processor);
  }

  onPushCompleted(
    handler: (job: Queue.Job<PushNotificationJobData>) => Promise<void>
  ) {
    this.pushQueue.on("completed", handler);
  }

  onPushFailed(
    handler: (
      job: Queue.Job<PushNotificationJobData>,
      error: Error
    ) => Promise<void>
  ) {
    this.pushQueue.on("failed", handler);
  }

  async getQueueStatus() {
    return {
      waiting: await this.pushQueue.getWaitingCount(),
      active: await this.pushQueue.getActiveCount(),
      completed: await this.pushQueue.getCompletedCount(),
      failed: await this.pushQueue.getFailedCount(),
    };
  }

  getPushQueue() {
    return this.pushQueue;
  }
}
