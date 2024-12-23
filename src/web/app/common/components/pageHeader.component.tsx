import { ReactNode } from "react";
import { HiOutlineDownload, HiOutlinePlus } from "react-icons/hi";

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
        {actions && <div className="flex gap-3">{actions}</div>}
      </div>
    </div>
  );
}

// 자주 사용되는 액션 버튼들을 미리 정의
export function ExportButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
    >
      <HiOutlineDownload className="w-4 h-4" />
      내보내기
    </button>
  );
}

export function CreateButton({
  onClick,
  text = "새로 만들기",
}: {
  onClick?: () => void;
  text?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
    >
      <HiOutlinePlus className="w-4 h-4" />
      {text}
    </button>
  );
}
