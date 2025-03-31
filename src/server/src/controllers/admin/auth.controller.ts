import { Request, Response, NextFunction } from "express";
import { validateDto, LoginDto, envConfig } from "@push-manager/shared";
import { AuthService } from "../../services/admin/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @summary 로그인 (완료)
   * @param dto 로그인 dto
   * @param req 인증 요청
   * @returns 인증 결과 (accessToken, refreshToken은 response header, cookie에 포함)
   * @throws 401 비밀번호 불일치
   * @throws 403 계정 제한 (비밀번호 불일치 5회)
   * @throws 404 유저 없음 (이메일 불일치)
   * @throws 405 인증방법 불일치 (nucode / kakao / google / naver)
   */

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(LoginDto, req.body);
      const ip = req.ip as string;
      const userAgent = req.headers["user-agent"] as string;
      const { user, accessToken, refreshToken } =
        await this.authService.authenticate(dto, ip, userAgent);
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.cookie("Refresh", refreshToken, {
        httpOnly: true,
        secure: envConfig.server.env !== "development",
      });
      res.success(user);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary 토큰 검증
   * @security bearer
   * @returns 토큰 검증 결과 true/false
   * @throws 400 Authorization 헤더 없는 경우 / access 토큰 없는 경우
   * @throws 401 만료된 토큰 (재 로그인 필요)
   * @throws 403 유효하지 않은 토큰 / 폐기된 토큰
   */

  async token() {
    return true;
  }
}
