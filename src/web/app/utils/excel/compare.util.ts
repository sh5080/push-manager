import { Toast } from "../toast.util";
import { IdentifyReader } from "./csv.util";

interface ComparisonResult {
  missing: string[];
  extra: string[];
  existing: string[];
}

export class ExcelCompareUtil {
  private static readonly CHUNK_SIZE = 1000;
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  static async compareWithApi<T>(
    file: File,
    apiData: T[],
    options: {
      getIdentify: (item: T) => string;
    }
  ): Promise<ComparisonResult | null> {
    if (!file) return null;

    if (file.size > this.MAX_FILE_SIZE) {
      Toast.error("5MB 이하의 파일만 처리 가능합니다.");
      return null;
    }

    const toastId = Toast.loading("파일 비교 중...");

    try {
      let fileIdentifies: string[];
      if (file.name.toLowerCase().endsWith(".csv")) {
        fileIdentifies = await IdentifyReader.csvToIdentify(file);
      } else {
        fileIdentifies = await IdentifyReader.excelToIdentify(file);
      }

      const fileIdentifySet = new Set(fileIdentifies);

      const apiIdentifies = new Set(apiData.map(options.getIdentify));
      const result = await this.compareIdentifies(
        fileIdentifySet,
        apiIdentifies
      );

      Toast.update(toastId, "비교 완료", "success");
      return result;
    } catch (error) {
      console.error("Compare error:", error);
      Toast.update(
        toastId,
        error instanceof Error
          ? error.message
          : "파일 비교 중 오류가 발생했습니다.",
        "error"
      );
      return null;
    }
  }

  private static async compareIdentifies(
    fileIdentifies: Set<string>,
    apiIdentifies: Set<string>
  ): Promise<ComparisonResult> {
    const missing: string[] = [];
    const extra: string[] = [];
    const existing: string[] = [];

    // 청크 단위로 비교
    const processChunk = async (
      identifies: string[],
      sourceSet: Set<string>,
      targetSet: Set<string>,
      resultArray: string[]
    ) => {
      for (let i = 0; i < identifies.length; i += this.CHUNK_SIZE) {
        const chunk = identifies.slice(i, i + this.CHUNK_SIZE);
        chunk.forEach((id) => {
          if (!targetSet.has(id)) {
            resultArray.push(id);
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    };

    // 기 등록 건수 확인
    const processExisting = async (identifies: string[]) => {
      for (let i = 0; i < identifies.length; i += this.CHUNK_SIZE) {
        const chunk = identifies.slice(i, i + this.CHUNK_SIZE);
        chunk.forEach((id) => {
          if (apiIdentifies.has(id) && fileIdentifies.has(id)) {
            existing.push(id);
          }
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    };

    await Promise.all([
      processChunk([...fileIdentifies], fileIdentifies, apiIdentifies, missing),
      processChunk([...apiIdentifies], apiIdentifies, fileIdentifies, extra),
      processExisting([...fileIdentifies]),
    ]);

    return { missing, extra, existing };
  }
}
