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
import { IdentifyReader } from "../../utils/excelCsv.util";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { TargetUploadTab } from "./tabs/tab1";
import { PushConditionTab } from "./tabs/tab2";
import { PushContentTab } from "./tabs/tab3";
import { Toast } from "app/utils/toast.util";
import { useRouter } from "next/navigation";
import { Button } from "app/common/components/button.component";

interface SendPushModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PushFormData {
  targetFile: File | null;
  identifyArray: string[];
  fname: string;
  plink: string;
  sendDateString: string;
  title: string;
  content: string;
  appId: (typeof AppIdEnum)[keyof typeof AppIdEnum];
  imageEnabled: boolean;
  linkEnabled: boolean;
  isTestMode: boolean;
}

export function SendPushModal({ isOpen, onClose }: SendPushModalProps) {
  const router = useRouter();
  const [pushData, setFormData] = useState<PushFormData>({
    targetFile: null,
    identifyArray: [],
    fname: "",
    plink: "",
    sendDateString: "",
    title: "",
    content: "",
    appId: AppIdEnum.PROD,
    imageEnabled: false,
    linkEnabled: false,
    isTestMode: false,
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
    if (!pushData.targetFile) {
      setError("업로드된 파일이 없습니다.");
      return;
    }

    try {
      setIsParsingFile(true);
      setError(null);

      const fileExt = pushData.targetFile.name.split(".").pop()?.toLowerCase();
      let identifyArray: string[] = [];

      if (fileExt === "csv") {
        identifyArray = await IdentifyReader.csvToIdentify(pushData.targetFile);
      } else if (fileExt === "xlsx" || fileExt === "xls") {
        identifyArray = await IdentifyReader.excelToIdentify(
          pushData.targetFile
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

  const handleUpdateIdentifiers = (newIds: string) => {
    const newIdentifiers = newIds.split("\n").filter((id) => id.trim());

    setFormData((prev) => ({
      ...prev,
      identifyArray: newIdentifiers,
    }));
  };

  const handleSubmit = async () => {
    const toastId = Toast.loading("푸시 발송 요청 처리중...");

    try {
      setIsLoading(true);
      setError(null);

      // 필수 입력값 검증
      if (!pushData.title.trim()) {
        throw new Error("푸시 제목을 입력해주세요.");
      }
      if (!pushData.content.trim()) {
        throw new Error("푸시 내용을 입력해주세요.");
      }
      if (pushData.identifyArray.length === 0) {
        throw new Error("타겟 대상을 입력하거나 파일을 업로드해주세요.");
      }
      if (!pushData.sendDateString) {
        throw new Error("발송 시간을 설정해주세요.");
      }

      const pushApi = PushAPI.getInstance();
      const response = await pushApi.sendPush({
        identifyArray: pushData.identifyArray,
        ...(pushData.imageEnabled && { fname: pushData.fname }),
        ...(pushData.linkEnabled && { plink: pushData.plink }),
        sendDateString: pushData.sendDateString,
        title: pushData.title,
        content: pushData.content,
        appId: pushData.appId,
      });

      if (response) {
        Toast.update(toastId, "푸시 발송이 예약되었습니다.", "success");
        onClose();
      }
    } catch (error) {
      console.error("푸시 발송 에러:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      Toast.update(toastId, errorMessage, "error");
      setError(errorMessage);
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

  const handleNavigateToScheduled = () => {
    onClose();
    router.push("/push/scheduled");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-2xl shadow-xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              타겟 푸시 예약
            </DialogTitle>
            <Button variant="line" size="32" onClick={onClose} className="!p-2">
              <HiX className="w-5 h-5" />
            </Button>
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
                  targetFile={pushData.targetFile}
                  targetIds={pushData.identifyArray.join("\n")}
                  identifiersCount={pushData.identifyArray.length}
                  isParsingFile={isParsingFile}
                  onFileUpload={handleFileUpload}
                  onLoadIdentifiers={handleLoadIdentifiers}
                  onUpdateIdentifiers={handleUpdateIdentifiers}
                />
              </TabPanel>

              <TabPanel>
                <PushConditionTab
                  appId={pushData.appId}
                  sendDateString={pushData.sendDateString}
                  fname={pushData.fname}
                  plink={pushData.plink}
                  onChange={handleChange}
                  imageEnabled={pushData.imageEnabled}
                  linkEnabled={pushData.linkEnabled}
                />
              </TabPanel>

              <TabPanel>
                <PushContentTab
                  title={pushData.title}
                  content={pushData.content}
                  isTestMode={pushData.isTestMode}
                  onChange={handleChange}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          {error && (
            <div className="px-6 mb-4">
              <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
                {error}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                생성을 완료한 뒤{" "}
                <Button
                  variant="green-point"
                  size="32"
                  onClick={handleNavigateToScheduled}
                  className="!p-0 !border-0"
                >
                  타겟 푸시 예약
                </Button>
                에서 정상적으로 식별자가 삽입되었는지 확인 후
                <br />
                예약을 확정해야 전송이 시작됩니다.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="line"
                size="38"
                onClick={onClose}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button
                variant="solid"
                size="38"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "처리중..." : "생성하기"}
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
