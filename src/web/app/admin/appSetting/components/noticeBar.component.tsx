import { IAppSetting, INoticeBar } from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";

interface NoticeBarProps {
  noticeBar: IAppSetting & { value: INoticeBar };
}

export function NoticeBar({ noticeBar }: NoticeBarProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-medium mb-4">노티스바 설정</h2>
      <div className="space-y-2 text-sm">
        <p>링크: {noticeBar?.value.link}</p>
        <p>내용: {noticeBar?.value.content}</p>
        <p>시작일: {formatDate(noticeBar?.value.startAt!, "+00:00")}</p>
        <p>종료일: {formatDate(noticeBar?.value.endAt!, "+00:00")}</p>
        <p>활성화: {noticeBar?.value.isActive ? "예" : "아니오"}</p>
        <p>플랫폼: {noticeBar?.value.platform}</p>
      </div>
    </div>
  );
}
