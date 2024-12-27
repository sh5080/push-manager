import * as XLSX from "xlsx";
import { parse } from "csv-parse/sync";

export class IdentifyReader {
  /**
   * @note 1번 행에 identify, 그 아래 식별자id를 입력합니다.
   */
  static async excelToIdentify(file: File): Promise<string[]> {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const identifySheet = workbook.Sheets[workbook.SheetNames[0]];

    const identifyData = XLSX.utils.sheet_to_json(identifySheet, {
      header: 1,
    }) as unknown[][];

    const headerRow = identifyData[0] as string[];
    const identifyColumnIndex = headerRow.findIndex(
      (col) => col?.toLowerCase() === "identify"
    );

    if (identifyColumnIndex === -1) {
      throw new Error("IDENTIFY 컬럼을 찾을 수 없습니다.");
    }

    return identifyData
      .slice(1)
      .map((row) => row[identifyColumnIndex] as string)
      .filter((value) => value && value.trim());
  }

  static async csvToIdentify(file: File): Promise<string[]> {
    const text = await file.text();
    const records = parse(text, { columns: true });
    return records
      .map((record: any) => record.identify)
      .filter((value: string) => value && value.trim());
  }
}
