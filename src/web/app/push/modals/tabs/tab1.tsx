import { FileUpload } from "app/common/components/fileUpload.component";
import { TextareaComponent } from "app/common/components/textarea.component";
import { useState, useEffect } from "react";

import { Modal } from "app/common/components/modal.component";
import { TestIdentifies } from "app/push/identify/components/testIdentifies.component";
import { ITestIdentify } from "@push-manager/shared/types/entities/testIdentify.entity";

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
  const [editableIds, setEditableIds] = useState(targetIds);
  const [isTestIdentifiersModalOpen, setIsTestIdentifiersModalOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdentifiers, setSelectedIdentifiers] = useState<
    ITestIdentify[]
  >([]);

  useEffect(() => {
    if (targetIds) {
      setEditableIds((prev) => {
        const existingIds = prev.split("\n").filter((id) => id.trim());
        const newIds = targetIds.split("\n").filter((id) => id.trim());
        const mergedIds = [...new Set([...existingIds, ...newIds])];
        return mergedIds.join("\n");
      });
    }
  }, [targetIds]);

  const handleSave = () => {
    onUpdateIdentifiers(editableIds);
    setIsEditing(false);
  };

  const handleDirectInput = () => {
    setIsEditing(true);
  };

  const handleTestIdentifiersSelect = (newIds: string[]) => {
    setEditableIds((prev) => {
      const existingIds = prev.split("\n").filter((id) => id.trim());
      const mergedIds = [...new Set([...existingIds, ...newIds])];
      return mergedIds.join("\n");
    });
  };

  const handleIdentifiersLoad = (identifiers: ITestIdentify[]) => {
    setSelectedIdentifiers(identifiers);
  };

  const handleAddIdentifiers = () => {
    const identifies = selectedIdentifiers.map((id) => id.identify);
    handleTestIdentifiersSelect(identifies);
    setIsTestIdentifiersModalOpen(false);
  };

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

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              직접 입력
            </button>
            <button
              onClick={() => setIsTestIdentifiersModalOpen(true)}
              className="px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              식별자 불러오기
            </button>
          </div>

          {isEditing ? (
            <TextareaComponent
              rows={6}
              placeholder="식별자를 입력하세요 (한 줄에 하���씩)"
              value={editableIds}
              onChange={(e) => setEditableIds(e.target.value)}
              className="bg-white"
              autoFocus
            />
          ) : (
            editableIds && (
              <IdentifierList
                identifiers={editableIds.split("\n").filter((id) => id.trim())}
                isEditing={true}
                onDelete={(index) => {
                  const newIds = editableIds.split("\n");
                  newIds.splice(index, 1);
                  setEditableIds(newIds.join("\n"));
                  onUpdateIdentifiers(newIds.join("\n"));
                }}
                onEdit={(index, newValue) => {
                  const newIds = editableIds.split("\n");
                  newIds[index] = newValue;
                  setEditableIds(newIds.join("\n"));
                  onUpdateIdentifiers(newIds.join("\n"));
                }}
              />
            )
          )}
          {editableIds && (
            <p className="text-sm text-gray-500 text-right">
              총{" "}
              {editableIds
                .split("\n")
                .filter((id) => id.trim())
                .length.toLocaleString()}
              개
              {editableIds.split("\n").filter((id) => id.trim()).length > 100 &&
                " (처음 100개만 표시)"}
            </p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isTestIdentifiersModalOpen}
        onClose={() => setIsTestIdentifiersModalOpen(false)}
        title="테스트 식별자 목록"
        size="lg"
        actions={
          <button
            onClick={handleAddIdentifiers}
            className="px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            선택한 식별자 추가
          </button>
        }
      >
        <TestIdentifies onIdentifiersLoad={handleIdentifiersLoad} />
      </Modal>
    </div>
  );
}
