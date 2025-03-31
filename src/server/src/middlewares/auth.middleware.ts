import { Response, NextFunction } from "express";
import { AuthService } from "../services/admin/auth.service";
import { decode } from "jsonwebtoken";
import { UserPayload } from "../types/response.type";
import { BlackListEnum, TokenEnum } from "../types/enum.type";
import {
  AuthErrorMessage,
  BadRequestException,
  envConfig,
  ForbiddenException,
  UnauthorizedException,
} from "@push-manager/shared";
import { AuthRequest } from "../types/request.type";
import { DatabaseLogger } from "../utils/logger.util";
import { RedisService } from "../services/redis.service";
import { MemberService } from "../services/admin/member.service";
import { NewbestApi } from "../services/external/newbest.api";
import { AdminRepository } from "../repositories/admin/admin.repository";
import { MemberRepository } from "../repositories/admin/member.repository";

export class AuthMiddleware {
  constructor(private authService: AuthService) {}

  authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new BadRequestException(AuthErrorMessage.LOGIN_REQUIRED);
      }
      const accessToken = authorization.split("Bearer ")[1];
      if (!accessToken) {
        throw new BadRequestException(AuthErrorMessage.ACCESS_TOKEN_MISSING);
      }

      const accessSecret = envConfig.server.jwt.rs256.privateKey;
      try {
        // 액세스 토큰 검증
        const { userId, exp } = await this.authService.verify(
          accessToken,
          accessSecret,
          TokenEnum.ACCESS
        );

        // 블랙리스트 확인
        const blacklistData = await this.authService.getBlacklist(
          userId,
          accessToken
        );
        if (blacklistData.message === BlackListEnum.BLACKLISTED) {
          throw new ForbiddenException(AuthErrorMessage.FORBIDDEN);
        }

        // 세션 상태 확인
        const sessionStatus = await this.authService.getSessionStatus(userId);
        if (!sessionStatus) {
          throw new ForbiddenException(AuthErrorMessage.FORBIDDEN);
        }

        req.user = {
          userId,
          tokens: { accessToken, refreshToken: "" },
        };

        next();
      } catch (err) {
        // 액세스 토큰 만료 시 리프레시 토큰으로 재발급 시도
        if (err instanceof UnauthorizedException) {
          const cookies = req.headers.cookie?.split("; ") || [];
          const refreshToken = cookies
            .find((cookie) => cookie.startsWith("Refresh="))
            ?.split("=")[1];

          if (!refreshToken) {
            throw new UnauthorizedException(
              AuthErrorMessage.REFRESH_TOKEN_MISSING
            );
          }

          const decodedToken = decode(accessToken);
          if (!decodedToken) {
            throw new ForbiddenException(AuthErrorMessage.FORBIDDEN);
          }

          const userId = (decodedToken as UserPayload).userId;
          const refreshSecret = envConfig.server.jwt.hs256;

          try {
            // 리프레시 토큰 검증
            await this.authService.verify(
              refreshToken,
              refreshSecret,
              TokenEnum.REFRESH,
              userId
            );

            // 새 토큰 발급
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = await this.authService.createTokens(
              userId,
              req.ip as string,
              req.headers["user-agent"] as string
            );

            req.user = {
              userId,
              tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              },
            };

            res.setHeader("Authorization", `Bearer ${newAccessToken}`);
            res.cookie("Refresh", newRefreshToken, {
              httpOnly: true,
              secure: envConfig.server.env !== "development",
            });

            next();
          } catch (refreshErr) {
            throw new UnauthorizedException(AuthErrorMessage.LOGIN_REQUIRED);
          }
        } else {
          throw new ForbiddenException(AuthErrorMessage.LOGIN_REQUIRED);
        }
      }
    } catch (error) {
      next(error);
    }
  };
}

export const authMiddleware = new AuthMiddleware(
  new AuthService(
    new MemberService(
      new MemberRepository(),
      new AdminRepository(),
      new NewbestApi()
    ),
    RedisService.getInstance(),
    DatabaseLogger.getInstance()
  )
);
