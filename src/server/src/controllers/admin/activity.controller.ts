import { NextFunction, Request, Response } from "express";
import { IActivityService } from "../../interfaces/admin/activity.interface";
import {
  BadRequestException,
  ExcelHandler,
  GetActivityDto,
  IActivityWithBestshopNm,
  validateDto,
} from "@push-manager/shared";
import fs from "fs";
import path from "path";

export class ActivityController {
  constructor(private readonly activityService: IActivityService) {}
  getActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = await validateDto(GetActivityDto, req.query);
      const activity = await this.activityService.getActivity(dto);
      res.success(activity);
    } catch (error) {
      next(error);
    }
  };

  updateActivityExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const file = req.file;
      if (!file) {
        throw new BadRequestException("파일이 업로드되지 않았습니다.");
      }

      const excel = await ExcelHandler.parseExcelFile(file.path);
      const { updatedCount, updatedData } =
        await this.activityService.updateActivityExcel(
          excel as IActivityWithBestshopNm[]
        );

      // 엑셀 파일 생성
      const excelFilePath = await ExcelHandler.createExcelFile(
        updatedData,
        "Activities"
      );

      // 파일을 클라이언트에 전송
      res.sendFile(path.resolve(excelFilePath), (err) => {
        if (err) {
          console.error("파일 전송 중 오류 발생:", err);
          next(err);
        } else {
          console.log("파일 전송 완료:", excelFilePath);

          // excelFilePath 삭제
          fs.unlink(excelFilePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("엑셀 파일 삭제 중 오류 발생:", unlinkErr);
            }
            const uploadsDir = path.join(__dirname, "../../../public/uploads");
            fs.readdir(uploadsDir, (readErr, files) => {
              if (readErr) {
                console.error("디렉토리 읽기 중 오류 발생:", readErr);
                return;
              }

              files.forEach((file) => {
                const filePath = path.join(uploadsDir, file);
                fs.unlink(filePath, (unlinkErr) => {
                  if (unlinkErr) {
                    console.error("파일 삭제 중 오류 발생:", unlinkErr);
                  }
                });
              });
            });
          });
        }
      });
    } catch (error) {
      console.error("엑셀 처리 중 오류:", error);
      next(error);
    }
  };
}
