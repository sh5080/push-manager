import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Pagination } from "app/common/components/pagination.component";
import { Search } from "app/common/components/search.component";
import { HiChevronDown } from "react-icons/hi";

interface IdentifierListProps {
  title: string;
  identifiers: string[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  paginatedItems: string[];
  onItemAction?: (id: string) => void;
  actionLabel?: string;
  showMoveAllButton?: boolean;
  onMoveAll?: () => void;
  showResetButton?: boolean;
  onReset?: () => void;
  disableAction?: (id: string) => boolean;
  actionClassName?: string;
}

export function IdentifierList({
  title,
  identifiers,
  searchTerm,
  onSearchChange,
  filteredCount,
  totalCount,
  currentPage,
  onPageChange,
  pageSize,
  onPageSizeChange,
  paginatedItems,
  onItemAction,
  actionLabel,
  showMoveAllButton,
  onMoveAll,
  showResetButton,
  onReset,
  disableAction,
  actionClassName = "text-blue-600 hover:text-blue-700",
}: IdentifierListProps) {
  return (
    <Disclosure as="div">
      {({ open }) => (
        <div>
          <DisclosureButton className="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-900 hover:bg-blue-100">
            <span>
              {title}
              {searchTerm
                ? `(검색결과 ${filteredCount}건/전체 ${totalCount}건)`
                : `(${totalCount}건)`}
            </span>
            <HiChevronDown
              className={`${
                open ? "transform rotate-180" : ""
              } w-5 h-5 text-blue-500`}
            />
          </DisclosureButton>
          <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-600">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Search
                  value={searchTerm}
                  onChange={onSearchChange}
                  placeholder={`${title} 검색...`}
                />
                <div className="flex gap-2">
                  {showMoveAllButton && filteredCount > 0 && (
                    <button
                      onClick={onMoveAll}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      검색결과 전체 추가
                    </button>
                  )}
                  {showResetButton && (
                    <button
                      onClick={onReset}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      초기화
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                {paginatedItems.map((id, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded group hover:bg-gray-100"
                  >
                    <span>{id}</span>
                    {onItemAction && !disableAction?.(id) && (
                      <button
                        onClick={() => onItemAction(id)}
                        className={`opacity-0 group-hover:opacity-100 px-2 ${actionClassName}`}
                      >
                        {actionLabel}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <Pagination
                total={filteredCount}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={Math.ceil(filteredCount / pageSize)}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
              />
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}
