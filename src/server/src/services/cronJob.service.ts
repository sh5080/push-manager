import * as cron from "node-cron";
import path from "path";
import fs from "fs";
import { formatDate } from "@push-manager/shared";
import { FunctionService } from "./admin/function.service";
import { ReservationRepository } from "../repositories/admin/reservation.repository";

/**
 * 크론잡 서비스 - 주기적으로 실행되어야 하는 작업을 관리합니다.
 */
export class CronJobService {
  private readonly functionService: FunctionService;
  private readonly exportDir: string;

  constructor() {
    // 필요한 서비스들 주입
    this.functionService = new FunctionService(new ReservationRepository());

    // 엑셀 파일 저장 경로 설정
    this.exportDir = path.join(process.cwd(), "public", "cronJob");
    // 디렉토리가 없으면 생성
    if (!fs.existsSync(this.exportDir)) {
      fs.mkdirSync(this.exportDir, { recursive: true });
    }
  }

  /**
   * 모든 크론 작업을 시작합니다.
   */
  startCronJobs() {
    this.startReservationExportJobs();
    // 향후 다른 크론잡들이 추가될 수 있음
    // this.startAnotherCronJob();

    console.log("모든 크론 작업이 시작되었습니다.");
  }

  /**
   * 예약 데이터 자동 내보내기 크론 작업을 시작합니다.
   */
  private startReservationExportJobs() {
    const options = {
      timezone: "Asia/Seoul",
      scheduled: true,
      runOnInit: false,
    };

    // 예약 시간과 접미사를 배열로 정의
    // ex) 분 시 일 월 요일
    const scheduleTimes = [
      //  고정 9시 13시 17시
      { time: "0 9 * * *", suffix: "-0900" },
      { time: "0 13 * * *", suffix: "-1300" },
      { time: "0 17 * * *", suffix: "-1700" },
      // 추가
      // { time: "46 13 * * *", suffix: "-1346" },
    ];

    // 배열을 순회하며 크론 작업 설정
    scheduleTimes.forEach(({ time, suffix }) => {
      cron.schedule(
        time,
        async () => {
          try {
            await this.exportReservations(suffix);
            console.log(`${time} 예약 데이터 내보내기 완료`);
          } catch (error) {
            console.error(`${time} 예약 데이터 내보내기 실패:`, error);
          }
        },
        options
      );
      console.log(`${suffix} 예약 데이터 내보내기 크론 작업이 설정되었습니다.`);
    });

    console.log("예약 데이터 자동 내보내기 크론 작업이 시작되었습니다.");
  }

  /**
   * 예약 데이터를 엑셀로 내보냅니다.
   * @param timeSuffix 파일명에 추가할 시간 접미사 (예: -09, -13, -17)
   * @returns 생성된 파일 경로
   */
  private async exportReservations(timeSuffix: string) {
    try {
      const now = new Date();
      const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      const todayDate = formatDate(nowKST).split(" ")[0].replace(/\./g, "");
      const fileName = `reservations-${todayDate}${timeSuffix}.xlsx`;
      const filePath = path.join(this.exportDir, fileName);

      await this.functionService.exportReservationsToExcel(filePath);

      console.log(`예약 데이터가 성공적으로 내보내기 되었습니다: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error("예약 데이터 내보내기 중 오류가 발생했습니다:", error);
      throw error;
    }
  }

  /**
   * 수동으로 예약 데이터를 내보냅니다.
   * @param timeSuffix 파일명에 추가할 시간 접미사
   * @returns 생성된 파일 경로
   */
  async manualExportReservations(timeSuffix: string) {
    return await this.exportReservations(timeSuffix);
  }
}
