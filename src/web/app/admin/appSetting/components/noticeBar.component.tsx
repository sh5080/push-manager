import { useState } from "react";
import {
  IAppSetting,
  INoticeBar,
  IAppSettingValue,
} from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { NoticeBarModal } from "../modals/noticeBar.modal";
import { Button } from "@commonComponents/inputs/button.component";
import { Toast } from "app/utils/toast.util";
import { appSettingApi } from "app/apis/admin/appSetting.api";

interface NoticeBarProps {
  noticeBar: IAppSetting & { value: INoticeBar };
}

export function NoticeBar({ noticeBar }: NoticeBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(noticeBar);

  const handleSubmit = async (data: INoticeBar) => {
    try {
      const dto = {
        value: {
          ...data,
          startAt: new Date(data.startAt!).toISOString(),
          endAt: new Date(data.endAt!).toISOString(),
        },
      };
      await appSettingApi.updateNoticeBar(dto);

      setCurrentData({ ...currentData, value: data });

      Toast.success("노티스바 설정이 업데이트되었습니다.");
      setIsModalOpen(false);
    } catch (error) {
      Toast.error("노티스바 설정 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">노티스바 설정</h2>
        <Button variant="solid" onClick={() => setIsModalOpen(true)}>
          수정
        </Button>
      </div>
      <div className="space-y-2 text-sm">
        <p>링크: {currentData?.value.link}</p>
        <p>내용: {currentData?.value.content}</p>
        <p>시작일: {formatDate(currentData?.value.startAt!, "+00:00")}</p>
        <p>종료일: {formatDate(currentData?.value.endAt!, "+00:00")}</p>
        <p>활성화: {currentData?.value.isActive ? "예" : "아니오"}</p>
        <p>플랫폼: {currentData?.value.platform}</p>
      </div>

      <NoticeBarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentData}
      />
    </div>
  );
}
