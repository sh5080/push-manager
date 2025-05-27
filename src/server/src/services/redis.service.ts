import Redis from "ioredis";
import { redisConfig } from "../configs/db.config";
import { DatabaseLogger } from "../utils/logger.util";
import { CertificationType, RedisKeyType } from "../types/enum.type";

export class RedisService {
  private static instance: RedisService;
  private readonly logger = DatabaseLogger.getInstance();

  // 일반 작업용과 구독용 클라이언트 맵으로 관리
  private clientMap: Map<string, Redis> = new Map();

  private constructor() {
    this.createClient("default"); // 기본 클라이언트 생성
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
    // 기존 연결이 있으면 닫기
    if (this.clientMap.has(name)) {
      try {
        this.clientMap.get(name)!.disconnect();
        this.clientMap.delete(name);
      } catch (err: unknown) {
        this.logger.logPushError(
          `Redis client '${name}' disconnect error`,
          err as Error,
          {
            context: "Redis",
          }
        );
      }
    }

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

  /**
   * 안전하게 Redis 연결을 닫는 메서드
   */
  public closeConnection(): void {
    for (const [name, client] of this.clientMap) {
      try {
        client.disconnect();
        this.clientMap.delete(name);
        this.logger.logPushEvent(`Redis connection '${name}' closed`, {
          context: "Redis",
        });
      } catch (err: unknown) {
        this.logger.logPushError(
          `Error closing Redis connection '${name}'`,
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
