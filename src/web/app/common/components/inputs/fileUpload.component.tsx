"use client";

import { useCallback, useState, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineDocument, HiX } from "react-icons/hi";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
  accept?: {
    [key: string]: string[];
  };
  maxSize?: number;
}

export function FileUpload({
  onFileUpload,
  accept,
}: //   maxSize = 5242880,
FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = useMemo(() => {
    if (!accept) return null;

    const extensions = Object.values(accept).flat();
    return extensions.length > 0
      ? `(${extensions.join(", ")} 파일만 업로드 가능)`
      : null;
  }, [accept]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        setUploadedFile(acceptedFiles[0]);
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    onFileUpload(null);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    // maxSize,
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
            <HiOutlineDocument className="w-6 h-6 text-blue-500" />
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
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setUploadedFile(file);
              onFileUpload(file);
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
      <button type="button" className="text-blue-600 hover:text-blue-700">
        엑셀 파일 업로드
      </button>
      <p className="text-sm text-gray-500 mt-2">
        또는 파일을 이곳에 드래그하세요.
      </p>
      {acceptedFileTypes && (
        <p className="text-xs text-gray-400 mt-1">{acceptedFileTypes}</p>
      )}
    </div>
  );
}
