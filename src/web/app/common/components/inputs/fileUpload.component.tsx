"use client";

import { useCallback, useState, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineDocument, HiX, HiOutlinePhotograph } from "react-icons/hi";
import {
  isImageFile,
  isFileSizeValid,
  uploadImage,
} from "../../../utils/s3.util";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { ButtonText } from "@push-manager/shared/types/constants/common.const";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
  onUploadSuccess?: (imageUrl: string | null) => void;
  accept?: {
    [key: string]: string[];
  };
  maxSize?: number;
  isImage?: boolean;
  label?: string;
  autoUpload?: boolean;
  s3Path?: string;
}

export function FileUpload({
  onFileUpload,
  onUploadSuccess,
  accept,
  maxSize = 5242880,
  isImage = false,
  label = "파일 업로드",
  autoUpload = false,
  s3Path,
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = useMemo(() => {
    if (!accept) return null;

    const extensions = Object.values(accept).flat();
    return extensions.length > 0
      ? `(${extensions.join(", ")} 파일만 업로드 가능)`
      : null;
  }, [accept]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0];

        // 파일 유효성 검사
        if (isImage && !isImageFile(file)) {
          alert("이미지 파일만 업로드 가능합니다.");
          return;
        }

        if (maxSize && !isFileSizeValid(file, maxSize / (1024 * 1024))) {
          alert(`파일 크기는 ${maxSize / (1024 * 1024)}MB 이하여야 합니다.`);
          return;
        }

        setUploadedFile(file);
        onFileUpload(file);

        // 이미지 미리보기 생성
        if (isImage && file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }

        // 자동 업로드 옵션이 활성화된 경우
        if (autoUpload && s3Path) {
          await handleUpload(file, s3Path);
        }
      }
    },
    [onFileUpload, isImage, maxSize, autoUpload, s3Path]
  );

  const handleUpload = async (file: File, path: string) => {
    if (!file) return;

    setIsUploading(true);
    try {
      // 현재 날짜 기반 경로 생성
      const now = new Date();
      const year = formatDate(now, "+09:00").slice(0, 4);
      const month = formatDate(now, "+09:00").slice(5, 7);

      const uploadUrl = await uploadImage(file, `${path}/${year}/${month}`);
      if (onUploadSuccess) {
        onUploadSuccess(uploadUrl);
      }
    } catch (error) {
      console.error("업로드 처리 중 오류:", error);
      if (onUploadSuccess) {
        onUploadSuccess(null);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setPreview(null);
    onFileUpload(null);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const handleChangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  if (uploadedFile) {
    return (
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isImage ? (
              <HiOutlinePhotograph className="w-6 h-6 text-blue-500" />
            ) : (
              <HiOutlineDocument className="w-6 h-6 text-blue-500" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleChangeClick}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              변경
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isImage && preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded-md mx-auto"
            />
          </div>
        )}

        {!autoUpload && s3Path && (
          <div className="mt-3">
            <button
              onClick={() => handleUpload(uploadedFile, s3Path)}
              disabled={isUploading}
              className={`
                w-full px-4 py-2 rounded-md text-white font-medium
                ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }
              `}
            >
              {isUploading ? ButtonText.UPDATE_LOADING : ButtonText.UPLOAD}
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setUploadedFile(file);
              onFileUpload(file);

              // 이미지 미리보기 생성
              if (isImage && file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }
          }}
          accept={Object.values(accept || {})
            .flat()
            .join(", ")}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition-colors duration-200
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {isImage ? (
          <HiOutlinePhotograph className="w-10 h-10 text-gray-400 mb-2" />
        ) : (
          <HiOutlineDocument className="w-10 h-10 text-gray-400 mb-2" />
        )}
        <button type="button" className="text-blue-600 hover:text-blue-700">
          {label}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          또는 파일을 이곳에 드래그하세요.
        </p>
        {acceptedFileTypes && (
          <p className="text-xs text-gray-400 mt-1">{acceptedFileTypes}</p>
        )}
      </div>
    </div>
  );
}
