import Queue from "bull";
import { RedisService } from "./redis.service";
import { PushNotificationJobData } from "../types/push.type";
import { DatabaseLogger } from "../utils/logger.util";

export class QueueService {
  private defaultQueue: Queue.Queue;
  private bullBoardQueue: Queue.Queue;
  private pushQueue: Queue.Queue<PushNotificationJobData>;
  private readonly logger = DatabaseLogger.getInstance();
  private queues: Map<string, Queue.Queue> = new Map();

  constructor() {
    const redisService = RedisService.getInstance();
    this.defaultQueue = new Queue("default", {
      createClient: (type) => {
        return redisService.getClient(`default-${type}`);
      },
    });
    this.bullBoardQueue = new Queue("bullBoard", {
      createClient: (type) => {
        return redisService.getClient(`bullBoard-${type}`);
      },
    });
    this.pushQueue = new Queue("push", {
      createClient: (type) => {
        return redisService.getClient(`push-${type}`);
      },
    });

    this.queues.set("default", this.defaultQueue);
    this.queues.set("bullBoard", this.bullBoardQueue);
    this.queues.set("push", this.pushQueue);

    this.pushQueue.on("error", (error) => {
      this.logger.logPushError("Queue error", error, { context: "Queue" });
    });
  }

  async addPushJob(data: PushNotificationJobData) {
    console.log("data: ", data);
    try {
      const result = await this.pushQueue.add(data, {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      });
      return result;
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

  getQueue(name: string): Queue.Queue {
    return this.queues.get(name) || this.defaultQueue;
  }

  getPushQueue(): Queue.Queue<PushNotificationJobData> {
    return this.pushQueue;
  }
}
