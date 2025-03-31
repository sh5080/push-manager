import * as jwt from "jsonwebtoken";
import {
  AuthErrorMessage,
  BadRequestException,
  envConfig,
  ForbiddenException,
  LoginDto,
  TokenErrorMessage,
  UnauthorizedException,
  UserErrorMessage,
} from "@push-manager/shared";
import { IMemberService } from "@/src/interfaces/admin/member.interface";
import Redis from "ioredis";
import { RedisService } from "../redis.service";
import {
  RedisKey,
  BlockStatus,
  BlackListStatus,
  BlackListEnum,
  Blacklist,
  TokenEnumType,
  TokenEnum,
} from "../../types/enum.type";
import { Token, UserPayload } from "../../types/response.type";
import { DatabaseLogger } from "../../utils/logger.util";
import { passwordCompare } from "../../utils/crypto.util";

export class AuthService {
  private readonly redis: Redis;
  constructor(
    private readonly memberService: IMemberService,
    private readonly redisService: RedisService,
    private readonly logger = DatabaseLogger.getInstance()
  ) {
    this.redis = this.redisService.getClient("default");
  }

  async authenticate(dto: LoginDto, ip: string, userAgent: string) {
    const { email, password } = dto;

    const user = await this.memberService.getAdminByEmail(email);

    if (!user) {
      throw new BadRequestException(UserErrorMessage.USER_NOT_FOUND);
    }
    if (user.isActive === false) {
      throw new ForbiddenException(AuthErrorMessage.ACCOUNT_BLOCKED);
    }

    const isPasswordValid = await passwordCompare(
      user.salt,
      password,
      user.password
    );

    if (!isPasswordValid) {
      await this.incrementFailedLoginAttempts(user.id);
    }

    delete (user as any).password;
    delete (user as any).salt;

    const tokens = await this.createTokens(user.id, ip, userAgent);
    await this.resetFailedLoginAttempts(user.id);

    return { user: user, ...tokens };
  }

  async incrementFailedLoginAttempts(userId: string) {
    const failedAttemptsKey = this.redisService.userKey(
      RedisKey.PW_MISMATCH_COUNT,
      userId
    );

    const maxAttempts = 5;
    const attempts = await this.redis.get(failedAttemptsKey);

    if (attempts) {
      const attemptsCount = parseInt(attempts, 10);
      if (attemptsCount > maxAttempts - 1) {
        const sessionKey = this.redisService.userKey(RedisKey.SESSION, userId);
        await this.redis.hset(
          sessionKey,
          "status",
          BlockStatus.PASSWORD_ATTEMPT_EXCEEDED.toString()
        );
        throw new ForbiddenException(AuthErrorMessage.ACCOUNT_BLOCKED);
      }
      await this.redis.incr(failedAttemptsKey);
      throw new UnauthorizedException(
        AuthErrorMessage.PASSWORD_MISMATCH +
          AuthErrorMessage.MISMATCH_COUNTED +
          ` ${attemptsCount + 1} / ${maxAttempts},`
      );
    } else {
      await this.redis.set(failedAttemptsKey, "1");
      throw new UnauthorizedException(
        AuthErrorMessage.PASSWORD_MISMATCH +
          AuthErrorMessage.MISMATCH_COUNTED +
          ` 1 / ${maxAttempts}`
      );
    }
  }
  async resetFailedLoginAttempts(userId: string) {
    const failedAttemptsKey = this.redisService.userKey(
      RedisKey.PW_MISMATCH_COUNT,
      userId
    );
    await this.redis.del(failedAttemptsKey);
  }
  async setBlacklist(
    userId: string,
    accessToken: string
  ): Promise<BlackListStatus> {
    const key = this.redisService.userKey(RedisKey.BLACKLIST, userId);

    await this.redis.hmset(
      key,
      "accessToken",
      accessToken,
      "time",
      new Date().toISOString()
    );

    await this.redis.expire(key, envConfig.server.jwt.accessJwtExpiration);
    return { message: BlackListEnum.BLACKLISTED };
  }

  async getBlacklist(userId: string, token: string): Promise<BlackListStatus> {
    const logoutRedis = await this.redis.hgetall(
      this.redisService.userKey(RedisKey.BLACKLIST, userId)
    );
    const { accessToken } = logoutRedis;
    const blacklist: Blacklist = { accessToken: accessToken };

    let response: BlackListStatus = { message: BlackListEnum.BLACKLISTED };
    if (blacklist.accessToken === token) {
      response.message = BlackListEnum.BLACKLISTED;
    } else response.message = BlackListEnum.NON_BLACKLISTED;
    return response;
  }
  async getSessionStatus(userId: string) {
    const sessionKey = this.redisService.userKey(RedisKey.SESSION, userId);
    const sessionData = await this.redis.hgetall(sessionKey);

    if (sessionData && sessionData.status) {
      const statusCode = parseInt(sessionData.status, 10);

      if (statusCode === BlockStatus.PASSWORD_ATTEMPT_EXCEEDED) {
        throw new UnauthorizedException(AuthErrorMessage.ACCOUNT_BLOCKED);
      }
    }

    return true;
  }

  async createTokens(
    userId: string,
    ip: string,
    userAgent: string,
    role?: string | null
  ): Promise<Token> {
    const accessTokenPayload = { userId, role };
    const refreshTokenPayload = { uuid: crypto.randomUUID() };

    const accessToken = jwt.sign(
      accessTokenPayload,
      envConfig.server.jwt.rs256.privateKey,
      {
        algorithm: "RS256",
        expiresIn: envConfig.server.jwt.accessJwtExpiration,
        audience: "push-api",
        issuer: "push",
      }
    );
    const refreshToken = jwt.sign(
      refreshTokenPayload,
      envConfig.server.jwt.hs256,
      {
        algorithm: "HS256",
        expiresIn: envConfig.server.jwt.refreshJwtExpiration,
        audience: "push-api",
        issuer: "push",
      }
    );
    const sessionKey = this.redisService.userKey(RedisKey.SESSION, userId);
    await this.redis.hmset(
      sessionKey,
      "userId",
      userId,
      "refreshToken",
      refreshToken,
      "ip",
      ip,
      "userAgent",
      userAgent
    );

    await this.redis.expire(
      sessionKey,
      envConfig.server.jwt.refreshJwtExpiration
    );
    return { accessToken, refreshToken };
  }

  async verify(
    jwtString: string,
    secret: string,
    type: TokenEnumType,
    userId?: string
  ) {
    try {
      if (type === TokenEnum.REFRESH) {
        // 리프레시 토큰 검증
        if (!userId) {
          throw new UnauthorizedException(AuthErrorMessage.SESSION_NOT_FOUND);
        }
        const sessionKey = this.redisService.userKey(RedisKey.SESSION, userId);
        const redisSession = await this.redis.hgetall(sessionKey);

        if (!redisSession || Object.keys(redisSession).length === 0) {
          throw new UnauthorizedException(AuthErrorMessage.SESSION_NOT_FOUND);
        }

        if (redisSession.refreshToken !== jwtString) {
          throw new UnauthorizedException(TokenErrorMessage.TOKEN_INVALID);
        }
        const { userId: redisUserId } = redisSession;
        return { userId: redisUserId };
      } else {
        // 액세스 토큰 검증
        const payload = jwt.verify(jwtString, secret, {
          algorithms: ["RS256"],
        }) as jwt.JwtPayload & UserPayload;
        const { userId, exp } = payload;
        return { userId, exp };
      }
    } catch (err) {
      this.logger.logError(err as Error);
      if (err instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException(TokenErrorMessage.TOKEN_EXPIRED);
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new ForbiddenException(TokenErrorMessage.TOKEN_INVALID);
      } else {
        throw err;
      }
    }
  }
}
