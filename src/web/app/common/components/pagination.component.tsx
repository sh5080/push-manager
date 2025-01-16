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
  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            총 <span className="font-medium">{total}</span>건
          </div>
          <Dropdown
            options={PAGE_SIZE_OPTIONS}
            value={pageSize}
            onChange={onPageSizeChange}
            buttonLabel={(value) => `${value}개씩 보기`}
            itemLabel={(value) => `${value}개씩 보기`}
            direction="up"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`p-2 ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            } rounded`}
          >
            <HiChevronDoubleLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            } rounded`}
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-3 py-1 text-sm text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            } rounded`}
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`p-2 ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            } rounded`}
          >
            <HiChevronDoubleRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
