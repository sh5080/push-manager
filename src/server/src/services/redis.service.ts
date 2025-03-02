import Redis from "ioredis";
import { redisConfig } from "../configs/db.config";
import { DatabaseLogger } from "../utils/logger.util";

export class RedisService {
  private static instance: RedisService;
  private client: Redis;
  private readonly logger = DatabaseLogger.getInstance();

  private constructor() {
    this.client = new Redis(redisConfig);

    this.client.on("connect", () => {
      this.logger.logPushEvent("Redis connected", { context: "Redis" });
    });

    this.client.on("error", (error) => {
      this.logger.logPushError("Redis error", error, { context: "Redis" });
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public getClient(): Redis {
    return this.client;
  }
}
