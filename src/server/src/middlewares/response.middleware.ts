import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "@push-manager/shared";

export const responseMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.success = function <T>(data?: T, status?: number, message?: string) {
      const response: SuccessResponse<T> = {
        success: true,
        data,
        ...(message && { message }),
      };

      return this.status(status || 200).json(response);
    };

    next();
  };
};

// Response 인터페이스 확장
declare global {
  namespace Express {
    interface Response {
      success<T>(data: T, status?: number, message?: string): Response;
    }
  }
}
