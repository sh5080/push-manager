"use client";

import { useState } from "react";
import { FileUpload } from "../../common/components/inputs/fileUpload.component";
import { Modal } from "../../common/components/inputs/modal.component";
import { Toast } from "app/utils/toast.util";
import { HiClipboard, HiClipboardCheck } from "react-icons/hi";

export default function PushImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    // 파일이 변경되면 이전 업로드 결과 초기화
    setUploadedImageUrl(null);
  };

  const handleUploadSuccess = (result: string | null) => {
    if (result) {
      setUploadedImageUrl(result);
      setIsModalOpen(true); // 업로드 성공 시 모달 열기
    } else {
      Toast.error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleCopyUrl = () => {
    if (uploadedImageUrl) {
      navigator.clipboard
        .writeText(uploadedImageUrl)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // 2초 후 복사 상태 초기화
        })
        .catch((err) => {
          console.error("클립보드 복사 실패:", err);
          Toast.error("클립보드 복사에 실패했습니다.");
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">푸시 이미지 업로드</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">이미지 선택</h2>

        <FileUpload
          onFileUpload={handleFileUpload}
          onUploadSuccess={handleUploadSuccess}
          accept={{
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
          }}
          maxSize={10 * 1024 * 1024} // 10MB
          isImage={true}
          label="이미지 파일 선택"
          s3Path="push-alert"
          autoUpload={false} // 자동 업로드 비활성화 (수동 업로드 버튼 표시)
        />
      </div>

      {/* 업로드 성공 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="이미지 업로드 성공"
        size="lg"
        showCloseButton={true}
        closeButtonText="닫기"
      >
        <div className="space-y-4">
          <p className="text-green-600 font-medium">
            이미지가 성공적으로 업로드되었습니다.
          </p>

          {/* 이미지 미리보기 */}
          <div className="border rounded-md p-2 bg-gray-50">
            <img
              src={uploadedImageUrl || ""}
              alt="업로드된 이미지"
              className="max-h-64 mx-auto rounded"
            />
          </div>

          {/* 이미지 URL */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이미지 URL
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={uploadedImageUrl || ""}
                readOnly
                className="flex-1 border rounded-l-md px-3 py-2 text-sm bg-gray-50"
              />
              <button
                onClick={handleCopyUrl}
                className={`px-3 py-2 rounded-r-md text-white ${
                  isCopied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isCopied ? (
                  <>
                    <HiClipboardCheck className="inline-block mr-1" /> 복사 완료
                  </>
                ) : (
                  <>
                    <HiClipboard className="inline-block mr-1" /> 복사
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
