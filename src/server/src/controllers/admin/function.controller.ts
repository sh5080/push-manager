import { Request, Response, NextFunction } from "express";
import { FunctionService } from "../../services/admin/function.service";
import { ExcelHandler } from "@push-manager/shared";
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

      res.success({
        message: "예약 데이터가 엑셀 파일로 내보내기 되었습니다.",
        filePath,
        reservationsCount: reservations.length,
        reservations: reservations.slice(0, 10), // 첫 10개 항목만 응답에 포함
      });
    } catch (error) {
      next(error);
    }
  };
}
