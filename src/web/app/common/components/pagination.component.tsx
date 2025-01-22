import { Dropdown } from "./dropdown.component";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10개씩 보기" },
  { value: 20, label: "20개씩 보기" },
  { value: 50, label: "50개씩 보기" },
  { value: 100, label: "100개씩 보기" },
];

export function Pagination({
  total,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const buttonStyle = (disabled: boolean) =>
    `
    p-2
    rounded-full
    transition-all
    duration-200
    ${
      disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-gray-600 hover:bg-[#00CD3C]/10 hover:text-[#00CD3C]"
    }
  `
      .trim()
      .replace(/\s+/g, " ");

  return (
    <div className="px-6 py-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            총 <span className="text-[#00CD3C] font-medium">{total}</span>건
          </div>
          <Dropdown
            options={PAGE_SIZE_OPTIONS}
            value={pageSize}
            onChange={onPageSizeChange}
            buttonLabel={(value) => `${value}개씩 보기`}
            itemLabel={(value) => `${value}개씩 보기`}
            direction="up"
            size="32"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={buttonStyle(currentPage === 1)}
          >
            <HiChevronDoubleLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={buttonStyle(currentPage === 1)}
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-4 py-1.5 text-sm font-medium text-gray-900">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={buttonStyle(currentPage === totalPages)}
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={buttonStyle(currentPage === totalPages)}
          >
            <HiChevronDoubleRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
