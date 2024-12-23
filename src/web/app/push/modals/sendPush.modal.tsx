"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { PushAPI } from "app/apis/push.api";
import { IdentifyReader } from "../utils/excelCsv.util";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { TargetUploadTab } from "./tabs/tab1";
import { PushConditionTab } from "./tabs/tab2";
import { PushContentTab } from "./tabs/tab3";

interface SendPushModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PushFormData {
  targetFile: File | null;
  identifyArray: string[];
  fname: string; // 이미지 URL
  plink: string; // 외부 링크
  sendDateString: string; // 발송 날짜 및 시각
  title: string;
  content: string;
  targetMode: (typeof AppIdEnum)[keyof typeof AppIdEnum];
  imageEnabled: boolean;
  linkEnabled: boolean;
}

export function SendPushModal({ isOpen, onClose }: SendPushModalProps) {
  const [formData, setFormData] = useState<PushFormData>({
    targetFile: null,
    identifyArray: [],
    fname: "",
    plink: "",
    sendDateString: "",
    title: "",
    content: "",
    targetMode: AppIdEnum.PROD,
    imageEnabled: false,
    linkEnabled: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      targetFile: file,
      identifyArray: [],
    }));
    setError(null);
  };

  const handleLoadIdentifiers = async () => {
    if (!formData.targetFile) {
      setError("업로드된 파일이 없습니다.");
      return;
    }

    try {
      setIsParsingFile(true);
      setError(null);

      const fileExt = formData.targetFile.name.split(".").pop()?.toLowerCase();
      let identifyArray: string[] = [];

      if (fileExt === "csv") {
        identifyArray = await IdentifyReader.csvToIdentify(formData.targetFile);
      } else if (fileExt === "xlsx" || fileExt === "xls") {
        identifyArray = await IdentifyReader.excelToIdentify(
          formData.targetFile
        );
      } else {
        throw new Error("지원하지 않는 파일 형식입니다.");
      }

      if (identifyArray.length === 0) {
        throw new Error("식별자를 찾을 수 없습니다.");
      }

      setFormData((prev) => ({
        ...prev,
        identifyArray: identifyArray,
      }));
    } catch (error) {
      console.error("식별자 파싱 에러:", error);
      setError(
        error instanceof Error
          ? error.message
          : "파일 처리 중 오류가 발생했습니다."
      );
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 필수 입력값 검증
      if (!formData.title.trim()) {
        throw new Error("푸시 제목을 입력해주세요.");
      }
      if (!formData.content.trim()) {
        throw new Error("푸시 내용을 입력해주세요.");
      }
      if (formData.identifyArray.length === 0) {
        throw new Error("타겟 대상을 입력하거나 파일을 업로드해주세요.");
      }

      const pushApi = PushAPI.getInstance();
      const response = await pushApi.sendPush({
        identifyArray: formData.identifyArray,
        ...(formData.imageEnabled && { fname: formData.fname }),
        ...(formData.linkEnabled && { plink: formData.plink }),
        sendDateString: formData.sendDateString || new Date().toISOString(),
        title: formData.title,
        content: formData.content,
        targetMode: formData.targetMode,
      });

      if (response.success) {
        onClose();
        // TODO: 성공 토스트 메시지 표시
      } else {
        throw new Error(response.message || "푸시 발송 요청 실패");
      }
    } catch (error) {
      console.error("푸시 발송 에러:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    field: string,
    value: string | (typeof AppIdEnum)[keyof typeof AppIdEnum] | boolean
  ) => {
    setFormData((prev) => {
      const newState = {
        ...prev,
        [field]: value,
      };

      // Switch가 꺼지면 해당 필드 초기화
      if (field === "imageEnabled" && !value) {
        newState.fname = "";
      }
      if (field === "linkEnabled" && !value) {
        newState.plink = "";
      }

      return newState;
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <DialogTitle className="text-lg font-semibold">
              타겟 푸시 생성
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <TabGroup>
            <TabList className="flex space-x-1 border-b p-2">
              <Tab
                className={({ selected }) => `
                w-full py-2.5 text-sm font-medium leading-5 rounded-lg
                ${
                  selected
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }
              `}
              >
                1. 타겟 대상 입력
              </Tab>
              <Tab
                className={({ selected }) => `
                w-full py-2.5 text-sm font-medium leading-5 rounded-lg
                ${
                  selected
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }
              `}
              >
                2. 푸시 조건 설정
              </Tab>
              <Tab
                className={({ selected }) => `
                w-full py-2.5 text-sm font-medium leading-5 rounded-lg
                ${
                  selected
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }
              `}
              >
                3. 푸시 내용 입력
              </Tab>
            </TabList>

            <TabPanels className="p-6">
              <TabPanel>
                <TargetUploadTab
                  targetFile={formData.targetFile}
                  targetIds={formData.identifyArray.join("\n")}
                  identifiersCount={formData.identifyArray.length}
                  isParsingFile={isParsingFile}
                  onFileUpload={handleFileUpload}
                  onLoadIdentifiers={handleLoadIdentifiers}
                />
              </TabPanel>

              <TabPanel>
                <PushConditionTab
                  targetMode={formData.targetMode}
                  sendDateString={formData.sendDateString}
                  fname={formData.fname}
                  plink={formData.plink}
                  onChange={handleChange}
                  imageEnabled={formData.imageEnabled}
                  linkEnabled={formData.linkEnabled}
                />
              </TabPanel>

              <TabPanel>
                <PushContentTab
                  title={formData.title}
                  content={formData.content}
                  onChange={handleChange}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          {error && (
            <div className="px-6 mb-4">
              <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`
                px-4 py-2 text-sm text-white rounded-md
                ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {isLoading ? "처리중..." : "생성하기"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
