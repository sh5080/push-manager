import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { PushListItem } from "./pushListItem.component";
import { Pagination } from "../../common/components/pagination.component";
import {
  formatDate,
  getStatusDotStyle,
  getStatusStyle,
  getStatusText,
} from "../utils/push.util";
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineChevronRight,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineCalendar,
} from "react-icons/hi";

interface PushListProps {
  pushes: IPushStsMsg[];
  onPushSelect: (push: IPushStsMsg) => void;
}

export function PushList({ pushes, onPushSelect }: PushListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 검색 필터 영역 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <HiOutlineSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="제목 또는 발송자로 검색"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <HiOutlineFilter className="w-4 h-4" />
            필터
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <HiOutlineCalendar className="w-4 h-4" />
            기간
          </button>
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-12 px-6 py-4 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">번호</div>
          <div className="col-span-6">제목</div>
          <div className="col-span-3">발송 시간</div>
          <div className="col-span-2">상태</div>
        </div>
      </div>

      {/* 테이블 바디 */}
      <div className="divide-y divide-gray-200">
        {pushes.map((push, index) => (
          <div
            key={push.idx}
            className="grid grid-cols-12 px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors group"
            onClick={() => onPushSelect(push)}
          >
            {/* 번호 */}
            <div className="col-span-1 flex items-center text-sm text-gray-500">
              #{index + 1}
            </div>

            {/* 제목 및 발송자 */}
            <div className="col-span-6">
              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mb-1 line-clamp-1">
                {push.title || "오늘의 어드벤트 캘린더 열어보기"}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <HiOutlineUser className="w-3 h-3" />
                  {push.userId}
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="w-3 h-3" />
                  {formatDate(push.senddate)}
                </div>
              </div>
            </div>

            {/* 발송 시간 */}
            <div className="col-span-3 flex items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{formatDate(push.senddate)}</span>
              </div>
            </div>

            {/* 상태 */}
            <div className="col-span-2 flex items-center">
              <span
                className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                ${getStatusStyle(push.step)}
              `}
              >
                <span
                  className={`w-1.5 h-1.5 mr-1.5 rounded-full ${getStatusDotStyle(
                    push.step
                  )}`}
                ></span>
                {getStatusText(push.step)}
              </span>
            </div>

            {/* 더보기 아이콘 */}
            <div className="col-span-2 flex items-center justify-end">
              <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            총 <span className="font-medium">{pushes.length}</span>건
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              이전
            </button>
            <button className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 헬퍼 함수들은 pushHelpers.ts에서 import
