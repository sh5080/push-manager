import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "@push-manager/shared/types/response.type";

export const responseMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.success = function <T>(data?: T, message?: string) {
      const response: SuccessResponse<T> = {
        success: true,
        data,
        ...(message && { message }),
      };

      return this.json(response);
    };

    next();
  };
};

// Response 인터페이스 확장
declare global {
  namespace Express {
    interface Response {
      success<T>(data: T, message?: string): Response;
    }
  }
}
