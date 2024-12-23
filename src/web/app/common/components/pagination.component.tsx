interface PaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  total,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          총 <span className="font-medium">{total}</span>건
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => onPageChange(currentPage - 1)}
          >
            이전
          </button>
          <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded">
            {currentPage}
          </button>
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => onPageChange(currentPage + 1)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
