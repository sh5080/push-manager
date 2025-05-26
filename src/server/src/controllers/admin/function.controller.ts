import { Request, Response, NextFunction } from "express";
import { FunctionService } from "../../services/admin/function.service";
import { ExcelHandler } from "@push-manager/shared";
import fs from "fs";

export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  /**
   * @summary 예약 조회
   * @param dto 예약 조회 dto
   * @param req 예약 조회 요청
   * @returns 예약 조회 결과
   * @throws 401 비밀번호 불일치
   */

  getAllReservations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reservations = await this.functionService.getAllReservations();

      // 엑셀 파일로 저장
      const fileName = `reservations-${new Date().getTime()}.xlsx`;
      const filePath = await ExcelHandler.convertDataToExcel(
        reservations,
        fileName
      );

      // 파일 전송
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

      // 파일 스트림 생성 및 전송
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      // 파일 전송 완료 후 임시 파일 삭제
      fileStream.on("end", () => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("임시 파일 삭제 중 오류:", err);
        });
      });
    } catch (error) {
      next(error);
    }
  };

  updateContactInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = "d309a55e-704e-42d0-8e6d-6db87ca310ac";
      const contactInfo =
        '{"channels": [{"url": "http://pf.kakao.com/_Dxfxkin", "name": "카카오톡 CS채널 (6/2 오전 9시 반영)", "type": "KAKAO"}], "phoneNumbers": [{"type": "CUSTOMER_SUPPORT", "number": "02-588-2037", "description": "핫라인 전화번호 변경 (6/2 오전 9시 반영)"}]}';
      // 현재 {"phoneNumbers": [{"type": "CUSTOMER_SUPPORT", "number": "+8215447777", "description": "평일 10:30 - 18:00 운영"}]}

      const updatedReservations = await this.functionService.updateContactInfo(
        id,
        contactInfo
      );
      res.success({
        message: "예약 데이터가 업데이트 되었습니다.",
        updatedReservations,
      });
    } catch (error) {
      next(error);
    }
  };
}
