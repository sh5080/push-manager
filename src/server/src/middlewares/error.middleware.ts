import { Request, Response, NextFunction } from "express";
import { HttpException } from "../types/error.type";

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    status: number;
  };
}

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof HttpException) {
    const response: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        status: error.status,
      },
    };
    return res.status(error.status).json(response);
  }

  // 기본 에러 응답
  const response: ErrorResponse = {
    success: false,
    error: {
      message: "Internal Server Error",
      status: 500,
    },
  };

  return res.status(500).json(response);
};
