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
import { pushApi } from "app/apis/push.api";
import { IdentifyReader } from "../../utils/excel/csv.util";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { TargetUploadTab } from "./tabs/tab1.modal";
import { PushConditionTab } from "./tabs/tab2.modal";
import { PushContentTab } from "./tabs/tab3.modal";
import { Toast } from "app/utils/toast.util";
import { useRouter } from "next/navigation";
import { Button } from "@commonComponents/inputs/button.component";
import { PushType } from "app/types/prop.type";
import { convertKSTtoUTC } from "@push-manager/shared/utils/date.util";

interface SendPushModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PushFormData {
  targetFile: File | null;
  identifyArray: string[];
  fName: string;
  pLink: string;
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
  const [pushData, setPushData] = useState<PushFormData>({
    targetFile: null,
    identifyArray: [],
    fName: "",
    pLink: "",
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
  const [progress, setProgress] = useState<number | null>(null);

  const handleFileUpload = (file: File | null) => {
    setPushData((prev) => ({
      ...prev,
      targetFile: file,
      identifyArray: [],
    }));
  };

  const handleLoadIdentifiers = async () => {
    if (!pushData.targetFile) {
      Toast.error("업로드된 파일이 없습니다.");
      return;
    }

    try {
      setIsParsingFile(true);

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

      setPushData((prev) => ({
        ...prev,
        identifyArray: identifyArray,
      }));
    } catch (error) {
      console.error("식별자 파싱 에러:", error);
      Toast.error(
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

    setPushData((prev) => ({
      ...prev,
      identifyArray: newIdentifiers,
    }));
  };

  const handleSubmit = async (
    isReady: boolean = false,
    pushType: PushType = "fingerPush"
  ) => {
    const toastId = Toast.loading("푸시 발송 요청 처리중...");

    try {
      setIsLoading(true);

      if (pushData.identifyArray.length === 0) {
        throw new Error("타겟 대상을 입력하거나 파일을 업로드해주세요.");
      }
      if (
        (!pushData.sendDateString && pushType === "fingerPush") ||
        (!pushData.sendDateString && pushType === "oneSignal" && !isReady)
      ) {
        throw new Error("발송 시간을 설정해주세요.");
      }
      if (!pushData.title.trim()) {
        throw new Error("푸시 제목을 입력해주세요.");
      }
      if (!pushData.content.trim()) {
        throw new Error("푸시 내용을 입력해주세요.");
      }
      let response;

      if (pushType === "fingerPush") {
        // 5000개씩 나누기
        const chunkSize = 5000;
        const identifyChunks = [];

        for (let i = 0; i < pushData.identifyArray.length; i += chunkSize) {
          identifyChunks.push(pushData.identifyArray.slice(i, i + chunkSize));
        }

        // 각 청크별로 API 호출 (20초 간격)
        let totalProcessed = 0;

        for (let i = 0; i < identifyChunks.length; i++) {
          const chunk = identifyChunks[i];

          // 첫 번째 청크가 아니면 20초 대기
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 20000)); // 20초 대기
          }

          await pushApi.sendPush({
            identifyArray: chunk,
            ...(pushData.imageEnabled && { fName: pushData.fName }),
            ...(pushData.linkEnabled && { pLink: pushData.pLink }),
            sendDateString: pushData.sendDateString,
            title: pushData.title,
            content: pushData.content,
            appId: pushData.appId,
            isReady,
          });

          // 처리된 건수 누적
          totalProcessed += chunk.length;

          // 진행 상황 업데이트 (선택 사항)
          setProgress &&
            setProgress(
              Math.floor((totalProcessed / pushData.identifyArray.length) * 100)
            );
        }

        // 최종 응답 생성
        response = {
          totalCount: pushData.identifyArray.length,
          processedCount: totalProcessed,
          message: `총 ${pushData.identifyArray.length}건 중 ${totalProcessed}건 처리 완료`,
        };
      }
      if (pushType === "oneSignal") {
        response = await pushApi.sendOneSignalPush({
          identifyArray: pushData.identifyArray,
          // ...(pushData.imageEnabled && { fName: pushData.fName }),
          ...(pushData.linkEnabled && { deepLink: pushData.pLink }),
          ...(!isReady && {
            sendDate: convertKSTtoUTC(pushData.sendDateString),
          }),
          title: pushData.title,
          content: pushData.content,
          appId: pushData.appId,
        });
      }

      if (response) {
        Toast.update(toastId, "푸시 발송이 예약되었습니다.", "success");
        setPushData({
          targetFile: null,
          identifyArray: [],
          fName: "",
          pLink: "",
          sendDateString: "",
          title: "",
          content: "",
          appId: AppIdEnum.PROD,
          imageEnabled: false,
          linkEnabled: false,
          isTestMode: false,
        });
        onClose();
      }
    } catch (error) {
      console.error("푸시 발송 에러:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.";
      Toast.update(toastId, errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    field: string,
    value: string | (typeof AppIdEnum)[keyof typeof AppIdEnum] | boolean
  ) => {
    setPushData((prev) => {
      const newState = {
        ...prev,
        [field]: value,
      };

      if (field === "imageEnabled" && !value) {
        newState.fName = "";
      }
      if (field === "linkEnabled" && !value) {
        newState.pLink = "";
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
        <DialogPanel className="w-full max-w-4xl bg-white rounded-2xl shadow-xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              타겟 푸시 예약
            </DialogTitle>
            <button onClick={onClose} className="!p-2">
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
                  fName={pushData.fName}
                  pLink={pushData.pLink}
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

          <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-6">
                핑거푸시는 예약 생성을 완료한 뒤{" "}
                <Button
                  variant="green-point"
                  size="32"
                  onClick={handleNavigateToScheduled}
                  className="!p-0 !border-0"
                >
                  타겟 푸시 예약
                </Button>
                에서 정상적으로 식별자가 삽입되었는지 확인 후 예약을 확정해야
                전송이 시작됩니다.
                <br />
                (즉시 발송시 예약 확정 과정 없이 바로 전송 가능하나,
                지양해주세요.)
              </p>
              <p className="text-sm text-gray-600 leading-6">
                원시그널은 예약 확정 과정 없이 예약시간 설정 / 즉시 전송
                가능합니다.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Button
                  variant="solid"
                  size="38"
                  onClick={() => handleSubmit(false)}
                  disabled={isLoading}
                >
                  {isLoading ? "처리중..." : "핑거푸시 예약 생성"}
                </Button>

                <Button
                  variant="green-point"
                  size="38"
                  onClick={() => handleSubmit(true)}
                  disabled={isLoading}
                >
                  {isLoading ? "처리중..." : "핑거푸시 즉시 발송"}
                </Button>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="blue-solid"
                  size="38"
                  onClick={() => handleSubmit(false, "oneSignal")}
                  disabled={isLoading}
                >
                  {isLoading ? "처리중..." : "원시그널 예약 생성"}
                </Button>
                <Button
                  variant="blue-point"
                  size="38"
                  onClick={() => handleSubmit(true, "oneSignal")}
                  disabled={isLoading}
                >
                  {isLoading ? "처리중..." : "원시그널 즉시 발송"}
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
