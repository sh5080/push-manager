import * as XLSX from "xlsx";
import { ExcelResult, PushResultStats } from "../types/push.type";
import { formatDate } from "./date.util";
import path from "path";
export class ExcelHandler {
  /**
   * 엑셀의 1번 시트에는 푸시알림 내용, 2번 시트에는 식별자id를 입력합니다.
   * @note 1번 시트:
   * 1번 행에 msgTitle, msgContents, 그 아래 제목과 본문을 각각 입력합니다.
   * @note 2번 시트:
   * 1번 행에 identify, 그 아래 식별자id를 입력합니다.
   */
  static async read(filePath: string): Promise<ExcelResult> {
    const workbook = XLSX.readFile(filePath);
    const titleSheet = workbook.Sheets[workbook.SheetNames[0]];
    const identifySheet = workbook.Sheets[workbook.SheetNames[1]];

    // 1번 시트에서 제목과 내용을 가져옴
    const titleData: string[][] = XLSX.utils.sheet_to_json(titleSheet, {
      header: 1,
    });

    const [msgTitle, msgContents] = titleData[1];

    // 2번 시트에서 identify 데이터를 가져옴
    const identifyData = XLSX.utils.sheet_to_json(identifySheet, {
      header: 1,
    }) as unknown[][];

    // 1번 행에서 IDENTIFY라는 컬럼명이 있는 열의 인덱스를 찾음
    const headerRow = identifyData[0] as string[];
    const identifyColumnIndex = headerRow.indexOf("identify");

    if (identifyColumnIndex === -1) {
      throw new Error("IDENTIFY 컬럼을 찾을 수 없습니다.");
    }

    // IDENTIFY 컬럼의 데이터를 가져옴
    const identifyArray = identifyData
      .slice(1) // 1번 행은 헤더이므로 제외
      .map((row) => row[identifyColumnIndex] as string)
      .filter((value) => value); // 빈 값 제거

    return { messageData: { msgTitle, msgContents }, identifyArray };
  }

  static async saveCount(count: number, fileName: string): Promise<void> {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([["푸시 예정"], [count]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "푸시 예정");
    XLSX.writeFile(workbook, fileName);
    console.log(`푸시 예정 값이 ${fileName} 파일에 저장되었습니다.`);
  }

  static async savePushResult(
    result: PushResultStats,
    filePath: string
  ): Promise<void> {
    const workbook = XLSX.readFile(filePath);

    // 발송 결과를 성공/실패로 구분
    const successCount =
      result.resultCounts.find((r) => r.result === "SUCCESS")?.count || 0;
    const failCount =
      result.resultCounts.find((r) => r.result === "FAIL")?.count || 0;

    const data = [
      ["전체 요청 수", "성공", "실패", "누락"],
      [result.totalCount, successCount, failCount, result.missingCount],
    ];

    // 새로운 워크시트 생성
    const newSheet = XLSX.utils.aoa_to_sheet(data);

    // 2번째 시트 교체 또는 추가
    if (workbook.SheetNames.length > 1) {
      workbook.Sheets[workbook.SheetNames[1]] = newSheet;
    } else {
      XLSX.utils.book_append_sheet(workbook, newSheet, "푸시 결과");
    }

    // 파일 저장
    XLSX.writeFile(workbook, filePath);
    console.log(`푸시 결과가 ${filePath} 파일의 2번째 시트에 저장되었습니다.`);
  }

  static async convertDataToExcel(data: any[], fileName?: string): Promise<string> {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const now = formatDate(new Date());

    const outputFileName = `${fileName || "subscriptionRewardRequest"}-${now}.xlsx`;
    XLSX.writeFile(workbook, outputFileName);

    return outputFileName;
  }
  static async parseExcelFile<T>(filePath: string): Promise<T[]> {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const result = XLSX.utils.sheet_to_json(worksheet) as T[];
    return result;
  }

  static async createExcelFile(data: any[], sheetName: string): Promise<string> {
    // 엑셀 파일 생성 로직
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const now = formatDate(new Date());
    const outputFileName = `${sheetName}-${now}.xlsx`;
  
    // 상대 경로로 public/uploads에 저장
    const outputPath = path.join(__dirname, '../../public/uploads', outputFileName);
  
    // 파일 저장
    XLSX.writeFile(workbook, outputPath);
    return outputPath;
  }
}
