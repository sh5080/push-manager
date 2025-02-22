import { useState } from "react";
import {
  IAppSetting,
  INoticeBar,
  UpdateNoticeBarDto,
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

  const handleSubmit = async (data: INoticeBar) => {
    try {
      const dto: UpdateNoticeBarDto = {
        value: {
          ...data,
          startAt: new Date(data.startAt!).toISOString(),
          endAt: new Date(data.endAt!).toISOString(),
        },
      };
      await appSettingApi.updateNoticeBar(dto);
      Toast.success("노티스바 설정이 업데이트되었습니다.");
    } catch (error) {
      Toast.error("노티스바 설정 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">노티스바 설정</h2>
        <Button variant="line" onClick={() => setIsModalOpen(true)}>
          수정
        </Button>
      </div>
      <div className="space-y-2 text-sm">
        <p>링크: {noticeBar?.value.link}</p>
        <p>내용: {noticeBar?.value.content}</p>
        <p>시작일: {formatDate(noticeBar?.value.startAt!, "+00:00")}</p>
        <p>종료일: {formatDate(noticeBar?.value.endAt!, "+00:00")}</p>
        <p>활성화: {noticeBar?.value.isActive ? "예" : "아니오"}</p>
        <p>플랫폼: {noticeBar?.value.platform}</p>
      </div>

      <NoticeBarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={noticeBar}
      />
    </div>
  );
}
