import { FileUpload } from "app/common/components/fileUpload.component";
import { TextareaComponent } from "app/common/components/textarea.component";

interface TargetUploadTabProps {
  targetFile: File | null;
  targetIds: string;
  identifiersCount: number;
  isParsingFile: boolean;
  onFileUpload: (file: File | null) => void;
  onLoadIdentifiers: () => Promise<void>;
}

export function TargetUploadTab({
  targetFile,
  targetIds,
  identifiersCount,
  isParsingFile,
  onFileUpload,
  onLoadIdentifiers,
}: TargetUploadTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          타겟 대상 업로드
        </label>
        <div className="space-y-3">
          <FileUpload
            onFileUpload={onFileUpload}
            accept={{
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
              "application/vnd.ms-excel": [".xls"],
              "text/csv": [".csv"],
            }}
          />
          {targetFile && (
            <div className="flex justify-end">
              <button
                onClick={onLoadIdentifiers}
                disabled={isParsingFile}
                className={`
                  px-4 py-2 text-sm rounded-md
                  ${
                    isParsingFile
                      ? "bg-gray-300 cursor-not-allowed"
                      : "text-white bg-blue-600 hover:bg-blue-700"
                  }
                `}
              >
                {isParsingFile
                  ? "불러오는 중..."
                  : `식별자 불러오기 ${
                      identifiersCount > 0
                        ? `(${identifiersCount.toLocaleString()}개)`
                        : ""
                    }`}
              </button>
            </div>
          )}
          <TextareaComponent
            rows={6}
            placeholder="식별자 목록 미리보기 (처음 100개만 표시됩니다)"
            value={targetIds}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
