import { validateDto } from "@push-manager/shared";
import { PresignedUrlDto } from "@push-manager/shared/dist/dtos/common.dto";
import { Request, Response, NextFunction } from "express";
import { S3Service } from "../services/s3.service";

export class ImageController {
  constructor(private readonly s3Service: S3Service) {}

  getPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(PresignedUrlDto, req.query);
      const result = await this.s3Service.generatePresignedUrl(
        dto.path,
        dto.fileName,
        dto.contentType
      );
      res.success(result);
    } catch (error) {
      console.error("Error in get presigned url:", error);
      next(error);
    }
  };
}
