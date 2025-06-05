import { Modal } from "@commonComponents/inputs/modal.component";
import { FileUpload } from "@commonComponents/inputs/fileUpload.component";
import { useState } from "react";
import { activityApi } from "app/apis/admin/acitivity.api";
import { Toast } from "app/utils/toast.util";
import { ButtonText } from "@push-manager/shared/types/constants/common.const";

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExcelUploadModal({ isOpen, onClose }: ExcelUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
  };

  const handleUpdate = async () => {
    if (!file) {
      Toast.error("파일을 선택해 주세요.");
      return;
    }

    setIsUploading(true);
    try {
      const response = await activityApi.updateActivityExcel(file);
      // Blob으로 응답을 처리하여 파일 다운로드
      const blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "updated_activities.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      Toast.success("선호 매장이 성공적으로 갱신되었습니다.");
      onClose();
    } catch (error) {
      Toast.error("갱신 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="선호매장 갱신">
      <FileUpload onFileUpload={handleFileUpload} accept={{ "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] }} />
      <div className="flex justify-end space-x-2 pt-4">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
          닫기
        </button>
        <button onClick={handleUpdate} disabled={isUploading} className={`px-4 py-2 text-sm rounded-md text-white ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
          {isUploading ? ButtonText.UPDATE_LOADING : ButtonText.UPDATE}
        </button>
      </div>
    </Modal>
  );
}
