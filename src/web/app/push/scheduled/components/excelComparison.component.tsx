import { useState } from "react";
import { FileUpload } from "app/common/components/fileUpload.component";
import { ExcelCompareUtil } from "app/utils/excelCompare.util";
import { ComparisonResultModal } from "../modals/comparisonResult.modal";
import { Toast } from "app/utils/toast.util";
import { pushApi } from "app/apis/push.api";
import { AddToQueueDto, IPushQueue, Rnum } from "@push-manager/shared";
import { Button } from "app/common/components/button.component";

interface ExcelComparisonProps {
  queues: (IPushQueue & Rnum)[];
}

interface ComparisonResult {
  missing: string[];
  extra: string[];
  totalExcel: number;
  totalApi: number;
  existing: string[];
}

export function ExcelComparison({ queues }: ExcelComparisonProps) {
  const [compareFile, setCompareFile] = useState<File | null>(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [initialComparisonResult, setInitialComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);

  const handleCompareWithExcel = async () => {
    if (!compareFile) return;

    const result = await ExcelCompareUtil.compareWithApi(compareFile, queues, {
      getIdentify: (queue) => queue.identify,
    });

    if (result) {
      const newResult: ComparisonResult = {
        ...result,
        totalExcel:
          result.missing.length + (queues.length - result.extra.length),
        totalApi: queues.length,
      };
      setInitialComparisonResult(newResult);
      setComparisonResult(newResult);
    }
  };

  const handleSubmitQueue = async (identifies: string[]) => {
    try {
      if (!queues[0].cmpncode) {
        console.log(queues[0]);
        throw new Error("오류가 발생했습니다. 다시 시도해주세요.");
      }
      const dto: AddToQueueDto = {
        identifies,
        cmpncode: queues[0].cmpncode,
      };
      await pushApi.addToQueue(dto);
      Toast.success("예약 대기열에 성공적으로 추가되었습니다.");
    } catch (error) {
      Toast.error("예약 대기열 추가 중 오류가 발생했습니다.");
      throw error;
    }
  };

  return (
    <>
      {/* 파일 업로드 섹션 */}
      <div className="space-y-4">
        <FileUpload
          onFileUpload={setCompareFile}
          accept={{
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
            "application/vnd.ms-excel": [".xls"],
            "text/csv": [".csv"],
          }}
        />
        <div className="flex justify-end">
          <Button
            variant={compareFile ? "square-green" : "square-line"}
            onClick={handleCompareWithExcel}
            disabled={!compareFile}
          >
            비교하기
          </Button>
        </div>
      </div>

      {/* 비교 결과 표시 */}
      {comparisonResult && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">비교 결과</h3>
            <button
              onClick={() => setIsComparisonModalOpen(true)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              자세히 보기 (추가하기)
            </button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">엑셀</div>
              <div className="text-lg font-semibold text-blue-600">
                {comparisonResult.totalExcel}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  개
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">예약 대기</div>
              <div className="text-lg font-semibold text-green-600">
                {comparisonResult.totalApi}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  개
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">기 등록</div>
              <div className="text-lg font-semibold text-purple-600">
                {comparisonResult.existing.length}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  개
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">예약 누락</div>
              <div className="text-lg font-semibold text-red-600">
                {comparisonResult.missing.length}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  개
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">엑셀 누락</div>
              <div className="text-lg font-semibold text-orange-600">
                {comparisonResult.extra.length}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  개
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {comparisonResult && initialComparisonResult && (
        <ComparisonResultModal
          cmpncode={queues[0].cmpncode!}
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          result={comparisonResult}
          initialResult={initialComparisonResult}
          onUpdateResult={setComparisonResult}
          onSubmitQueue={handleSubmitQueue}
        />
      )}
    </>
  );
}
