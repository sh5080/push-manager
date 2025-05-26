import Redis from "ioredis";
import { redisConfig } from "../configs/db.config";
import { DatabaseLogger } from "../utils/logger.util";
import { CertificationType, RedisKeyType } from "../types/enum.type";

export class RedisService {
  private static instance: RedisService;
  private readonly logger = DatabaseLogger.getInstance();

  // 단일 클라이언트 인스턴스 사용
  private client: Redis | null = null;

  private constructor() {
    this.createClient();
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public getClient(name: string): Redis {
    if (!this.client) {
      this.createClient();
    }
    return this.client!;
  }

  private createClient(): void {
    // 기존 연결이 있으면 닫기
    if (this.client) {
      try {
        this.client.disconnect();
      } catch (err: unknown) {
        this.logger.logPushError(
          "Redis client disconnect error",
          err as Error,
          {
            context: "Redis",
          }
        );
      }
    }

    this.client = new Redis(redisConfig);

    this.client.on("connect", () => {
      this.logger.logPushEvent(`Redis client connected`, {
        context: "Redis",
      });
    });

    this.client.on("error", (error) => {
      this.logger.logPushError(`Redis client error`, error, {
        context: "Redis",
      });
    });
  }

  /**
   * 안전하게 Redis 연결을 닫는 메서드
   */
  public closeConnection(): void {
    if (this.client) {
      try {
        this.client.disconnect();
        this.client = null;
        this.logger.logPushEvent("Redis connection closed", {
          context: "Redis",
        });
      } catch (err: unknown) {
        this.logger.logPushError(
          "Error closing Redis connection",
          err as Error,
          {
            context: "Redis",
          }
        );
      }
    }
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
