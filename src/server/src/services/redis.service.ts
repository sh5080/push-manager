import Redis from "ioredis";
import { redisConfig } from "../configs/db.config";
import { DatabaseLogger } from "../utils/logger.util";
import { CertificationType, RedisKeyType } from "../types/enum.type";

export class RedisService {
  private static instance: RedisService;
  private readonly logger = DatabaseLogger.getInstance();

  private clientMap: Map<string, Redis> = new Map();

  private constructor() {
    this.createClient("default");
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public getClient(name: string = "default"): Redis {
    if (!this.clientMap.has(name)) {
      this.createClient(name);
    }
    return this.clientMap.get(name)!;
  }

  private createClient(name: string): void {
    const client = new Redis(redisConfig);

    client.on("connect", () => {
      this.logger.logPushEvent(`Redis client '${name}' connected`, {
        context: "Redis",
      });
    });

    client.on("error", (error) => {
      this.logger.logPushError(`Redis client '${name}' error`, error, {
        context: "Redis",
      });
    });

    this.clientMap.set(name, client);
  }

  /** 인증 Redis key
   * @params type: CertificationType
   * @params email: string
   */
  certificationKey(type: CertificationType, email: string): string {
    return `certification:${type}:${email}`;
  }

  /** 회원 Redis key
   * @params type: RedisKeyType
   * @params userId: string
   */
  userKey(type: RedisKeyType, userId: string): string {
    return `user:${type}:${userId}`;
  }
}
