import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiChevronDown, HiX } from "react-icons/hi";
import { useState, useEffect, useMemo } from "react";
import { Pagination } from "app/common/components/pagination.component";
import { useLoadingStore } from "app/store";
import { Search } from "app/common/components/search.component";

interface ComparisonResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    missing: string[];
    extra: string[];
    totalExcel: number;
    totalApi: number;
  };
}

export function ComparisonResultModal({
  isOpen,
  onClose,
  result,
}: ComparisonResultModalProps) {
  const [missingCurrentPage, setMissingCurrentPage] = useState(1);
  const [extraCurrentPage, setExtraCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginatedMissing, setPaginatedMissing] = useState<string[]>([]);
  const [paginatedExtra, setPaginatedExtra] = useState<string[]>([]);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const filteredResults = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return {
      missing: term
        ? result.missing.filter((id) => id.toLowerCase().includes(term))
        : result.missing,
      extra: term
        ? result.extra.filter((id) => id.toLowerCase().includes(term))
        : result.extra,
    };
  }, [result.missing, result.extra, searchTerm]);

  useEffect(() => {
    setMissingCurrentPage(1);
    setExtraCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen) {
      updatePaginatedData();
    }
  }, [missingCurrentPage, extraCurrentPage, pageSize, isOpen, filteredResults]);

  const updatePaginatedData = async () => {
    setIsLoading(true);
    try {
      const missingStartIndex = (missingCurrentPage - 1) * pageSize;
      const extraStartIndex = (extraCurrentPage - 1) * pageSize;

      await new Promise((resolve) => setTimeout(resolve, 0));

      setPaginatedMissing(
        filteredResults.missing.slice(
          missingStartIndex,
          missingStartIndex + pageSize
        )
      );
      setPaginatedExtra(
        filteredResults.extra.slice(extraStartIndex, extraStartIndex + pageSize)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const missingTotalPages = Math.ceil(
    filteredResults.missing.length / pageSize
  );
  const extraTotalPages = Math.ceil(filteredResults.extra.length / pageSize);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-4xl bg-white rounded-lg shadow-xl h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <DialogTitle className="text-lg font-semibold">
              비교 결과 상세
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="식별자 검색..."
            />

            <div className="space-y-4">
              <div className="text-sm text-gray-600 flex gap-4">
                <p>엑셀 파일 식별자 수: {result.totalExcel}개</p>
                <p>예약된 식별자 수: {result.totalApi}개</p>
              </div>

              <Disclosure as="div">
                {({ open }) => (
                  <div>
                    <DisclosureButton className="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-900 hover:bg-blue-100">
                      <span>
                        누락된 식별자
                        {searchTerm
                          ? `(검색결과 ${filteredResults.missing.length}개/전체 ${result.missing.length}개)`
                          : `(${result.missing.length}개)`}
                      </span>
                      <HiChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-blue-500`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                      <div className="space-y-4">
                        <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                          {paginatedMissing.map((id, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded">
                              {id}
                            </div>
                          ))}
                        </div>
                        <Pagination
                          total={filteredResults.missing.length}
                          currentPage={missingCurrentPage}
                          pageSize={pageSize}
                          totalPages={missingTotalPages}
                          onPageChange={setMissingCurrentPage}
                          onPageSizeChange={setPageSize}
                        />
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>

              <Disclosure as="div">
                {({ open }) => (
                  <div>
                    <DisclosureButton className="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-900 hover:bg-blue-100">
                      <span>
                        추가된 식별자
                        {searchTerm
                          ? `(검색결과 ${filteredResults.extra.length}개/전체 ${result.extra.length}개)`
                          : `(${result.extra.length}개)`}
                      </span>
                      <HiChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-blue-500`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                      <div className="space-y-4">
                        <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                          {paginatedExtra.map((id, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded">
                              {id}
                            </div>
                          ))}
                        </div>
                        <Pagination
                          total={filteredResults.extra.length}
                          currentPage={extraCurrentPage}
                          pageSize={pageSize}
                          totalPages={extraTotalPages}
                          onPageChange={setExtraCurrentPage}
                          onPageSizeChange={setPageSize}
                        />
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
