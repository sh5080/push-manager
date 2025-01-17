import { useState } from "react";
import { FileUpload } from "app/common/components/fileUpload.component";
import { ExcelCompareUtil } from "app/utils/excelCompare.util";
import { ComparisonResultModal } from "../modals/comparisonResult.modal";

interface ExcelComparisonProps {
  queues: any[];
}

export function ExcelComparison({ queues }: ExcelComparisonProps) {
  const [compareFile, setCompareFile] = useState<File | null>(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<{
    missing: string[];
    extra: string[];
    totalExcel: number;
    totalApi: number;
  } | null>(null);

  const handleCompareWithExcel = async () => {
    if (!compareFile) return;

    const result = await ExcelCompareUtil.compareWithApi(compareFile, queues, {
      getIdentify: (queue) => queue.identify,
    });

    if (result) {
      setComparisonResult({
        ...result,
        totalExcel:
          result.missing.length + (queues.length - result.extra.length),
        totalApi: queues.length,
      });
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
          <button
            onClick={handleCompareWithExcel}
            disabled={!compareFile}
            className={`px-4 py-2 text-sm rounded-md ${
              compareFile
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                : "text-gray-400 bg-gray-50 cursor-not-allowed"
            }`}
          >
            비교하기
          </button>
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
              자세히 보기
              <span className="text-lg">→</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
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

      {comparisonResult && (
        <ComparisonResultModal
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          result={comparisonResult}
        />
      )}
    </>
  );
}
