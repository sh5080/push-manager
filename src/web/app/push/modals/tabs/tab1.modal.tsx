import { FileUpload } from "@commonComponents/inputs/fileUpload.component";
import { TextareaComponent } from "@commonComponents/inputs/textarea.component";
import { useState, useEffect } from "react";

import { Modal } from "@commonComponents/inputs/modal.component";
import { TestIdentifies } from "app/push/identify/components/testIdentifies.component";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";
import { Button } from "@commonComponents/inputs/button.component";
import { InfoTooltip } from "@commonComponents/dataDisplay/infoTooltip.component";
import { ExcelGuideContent } from "app/push/components/guides/excelGuide.component";

interface TargetUploadTabProps {
  targetFile: File | null;
  targetIds: string;
  identifiersCount: number;
  isParsingFile: boolean;
  onFileUpload: (file: File | null) => void;
  onLoadIdentifiers: () => Promise<void>;
  onUpdateIdentifiers: (newIds: string) => void;
}

const IdentifierList = ({
  identifiers,
  isEditing,
  onDelete,
  onEdit,
}: {
  identifiers: string[];
  isEditing: boolean;
  onDelete?: (index: number) => void;
  onEdit?: (index: number, newValue: string) => void;
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (index: number, value: string) => {
    setEditingIndex(index);
    setEditValue(value);
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim() && onEdit) {
      onEdit(index, editValue.trim());
    }
    setEditingIndex(null);
  };

  return (
    <div className="max-h-[300px] overflow-y-auto border rounded-lg bg-gray-50">
      <div className="grid gap-1 p-2">
        {identifiers.slice(0, 100).map((id, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-white rounded border"
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(index);
                  if (e.key === "Escape") setEditingIndex(null);
                }}
                className="flex-1 px-2 py-1 text-sm border rounded"
                autoFocus
              />
            ) : (
              <span className="text-sm text-gray-700">{id}</span>
            )}
            {isEditing && (
              <div className="flex items-center gap-2">
                {editingIndex === index ? (
                  <button
                    onClick={() => handleSaveEdit(index)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    저장
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index, id)}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    수정
                  </button>
                )}
                |
                <button
                  onClick={() => onDelete?.(index)}
                  className="text-sm text-gray-600 hover:text-red-600"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function TargetUploadTab({
  targetFile,
  targetIds,
  identifiersCount,
  isParsingFile,
  onFileUpload,
  onLoadIdentifiers,
  onUpdateIdentifiers,
}: TargetUploadTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempEditableIds, setTempEditableIds] = useState("");
  const [uploadedFileIds, setUploadedFileIds] = useState<string[]>(() => {
    return targetIds ? targetIds.split("\n").filter((id) => id.trim()) : [];
  });
  const [manualIds, setManualIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"file" | "manual">("file");
  const [isTestIdentifiersModalOpen, setIsTestIdentifiersModalOpen] =
    useState(false);
  const [selectedIdentifierIds, setSelectedIdentifierIds] = useState<
    Set<number>
  >(new Set());
  const [tempSelectedIdentifiers, setTempSelectedIdentifiers] = useState<
    ITestIdentify[]
  >([]);
  const [isFileUpdate, setIsFileUpdate] = useState(false);
  const [isManualUpdate, setIsManualUpdate] = useState(false);

  useEffect(() => {
    if (targetFile) {
      setIsFileUpdate(true);
      setIsManualUpdate(false);
      onLoadIdentifiers();
    }
  }, [targetFile]);

  useEffect(() => {
    if (!targetIds) return;

    const newIds = targetIds.split("\n").filter((id) => id.trim());

    if (isFileUpdate) {
      setUploadedFileIds(newIds);
      setActiveTab("file");
      onUpdateIdentifiers([...newIds, ...manualIds].join("\n"));
      setIsFileUpdate(false);
    } else if (isManualUpdate) {
      setManualIds(newIds);
      setActiveTab("manual");
      onUpdateIdentifiers([...uploadedFileIds, ...newIds].join("\n"));
      setIsManualUpdate(false);
    }
  }, [targetIds, isFileUpdate, isManualUpdate]);

  const handleDirectInput = () => {
    setTempEditableIds(manualIds.join("\n"));
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsFileUpdate(false);
    setIsManualUpdate(true);

    const newManualIds = tempEditableIds.split("\n").filter((id) => id.trim());

    setManualIds(newManualIds);
    setIsEditing(false);
    setTempEditableIds("");

    const allIds = [...new Set([...uploadedFileIds, ...newManualIds])];
    onUpdateIdentifiers(allIds.join("\n"));
  };

  const handleCancel = () => {
    setTempEditableIds("");
    setIsEditing(false);
  };

  const handleIdentifiersLoad = (identifiers: ITestIdentify[]) => {
    const newSelectedIds = new Set(identifiers.map((id) => id.idx));
    setSelectedIdentifierIds(newSelectedIds);

    const selectedIdentifies = identifiers.map((id) => id.identify);
    setManualIds(selectedIdentifies);
    onUpdateIdentifiers(selectedIdentifies.join("\n"));
  };

  const handleSelectionChange = (identifiers: ITestIdentify[]) => {
    const newSelectedIds = new Set(identifiers.map((id) => id.idx));
    setSelectedIdentifierIds(newSelectedIds);
    setTempSelectedIdentifiers(identifiers);
  };

  const handleAddIdentifiers = () => {
    setIsFileUpdate(false);
    setIsManualUpdate(true);

    const newTestIdentifiers = tempSelectedIdentifiers.map((id) => id.identify);
    const updatedManualIds = [
      ...new Set([...manualIds, ...newTestIdentifiers]),
    ];

    setManualIds(updatedManualIds);
    const allIds = [...new Set([...uploadedFileIds, ...updatedManualIds])];
    onUpdateIdentifiers(allIds.join("\n"));

    setActiveTab("manual");
    setIsTestIdentifiersModalOpen(false);
  };

  const handleManualIdsUpdate = (newManualIds: string[]) => {
    setIsManualUpdate(true);
    setIsFileUpdate(false);

    setManualIds(newManualIds);
    onUpdateIdentifiers(newManualIds.join("\n"));
  };

  const handleFileIdsUpdate = (updatedIds: string[]) => {
    setIsFileUpdate(true);
    setIsManualUpdate(false);

    setUploadedFileIds(updatedIds);
    onUpdateIdentifiers(updatedIds.join("\n"));
  };

  const renderTabs = () => {
    const hasFileIds = uploadedFileIds.length > 0;
    const hasManualIds = manualIds.filter((id) => id.trim()).length > 0;

    if (!hasFileIds && !hasManualIds) return null;

    return (
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {hasFileIds && (
            <button
              onClick={() => setActiveTab("file")}
              className={`${
                activeTab === "file"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              파일 ({uploadedFileIds.length})
            </button>
          )}
          {hasManualIds && (
            <button
              onClick={() => setActiveTab("manual")}
              className={`${
                activeTab === "manual"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              수동 ({manualIds.filter((id) => id.trim()).length})
            </button>
          )}
        </nav>
      </div>
    );
  };

  const renderIdentifierList = () => {
    if (activeTab === "file" && uploadedFileIds.length > 0) {
      return (
        <div className="mt-4">
          <IdentifierList
            identifiers={uploadedFileIds}
            isEditing={true}
            onDelete={(index) => {
              const newIds = [...uploadedFileIds];
              newIds.splice(index, 1);
              handleFileIdsUpdate(newIds);
            }}
            onEdit={(index, newValue) => {
              const newIds = [...uploadedFileIds];
              newIds[index] = newValue;
              handleFileIdsUpdate(newIds);
            }}
          />
        </div>
      );
    }

    if (activeTab === "manual") {
      if (isEditing) {
        return (
          <TextareaComponent
            rows={6}
            placeholder="식별자를 입력하세요 (한 줄에 하나씩)"
            value={tempEditableIds}
            onChange={(e) => setTempEditableIds(e.target.value)}
            className="bg-white"
            autoFocus
          />
        );
      }

      return (
        manualIds.length > 0 && (
          <div className="mt-4">
            <IdentifierList
              identifiers={manualIds}
              isEditing={true}
              onDelete={(index) => {
                const newIds = [...manualIds];
                newIds.splice(index, 1);
                handleManualIdsUpdate(newIds);
              }}
              onEdit={(index, newValue) => {
                const newIds = [...manualIds];
                newIds[index] = newValue;
                handleManualIdsUpdate(newIds);
              }}
            />
          </div>
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-gray-700">
            타겟 대상 업로드
          </label>
          <InfoTooltip
            content={<ExcelGuideContent />}
            position="right"
            width="w-[400px]"
          />
        </div>
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
          {isParsingFile && (
            <div className="text-sm text-gray-500">파일 처리 중...</div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button variant="square-line" size="38" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="square-solid" size="38" onClick={handleSave}>
              저장
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="square-point"
              size="38"
              onClick={handleDirectInput}
            >
              직접 입력
            </Button>
            <Button
              variant="square-green"
              size="38"
              onClick={() => setIsTestIdentifiersModalOpen(true)}
            >
              식별자 불러오기
            </Button>
          </>
        )}
      </div>

      {renderTabs()}
      {renderIdentifierList()}

      <Modal
        isOpen={isTestIdentifiersModalOpen}
        onClose={() => setIsTestIdentifiersModalOpen(false)}
        title="테스트 식별자 목록"
        size="lg"
        actions={
          <Button variant="solid" size="38" onClick={handleAddIdentifiers}>
            선택한 식별자 추가 ({selectedIdentifierIds.size}개)
          </Button>
        }
      >
        <TestIdentifies
          onIdentifiersLoad={handleIdentifiersLoad}
          onSelectionChange={handleSelectionChange}
          initialSelectedIds={selectedIdentifierIds}
          key={isTestIdentifiersModalOpen ? "modal-open" : "modal-closed"}
        />
      </Modal>
    </div>
  );
}
