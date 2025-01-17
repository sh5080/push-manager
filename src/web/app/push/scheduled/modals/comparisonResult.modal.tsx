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
  initialResult: {
    missing: string[];
    extra: string[];
    totalExcel: number;
    totalApi: number;
  };
  onUpdateResult: (newResult: {
    missing: string[];
    extra: string[];
    totalExcel: number;
    totalApi: number;
  }) => void;
}

export function ComparisonResultModal({
  isOpen,
  onClose,
  result,
  initialResult,
  onUpdateResult,
}: ComparisonResultModalProps) {
  const [missingCurrentPage, setMissingCurrentPage] = useState(1);
  const [extraCurrentPage, setExtraCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [missingSearchTerm, setMissingSearchTerm] = useState("");
  const [extraSearchTerm, setExtraSearchTerm] = useState("");
  const [paginatedMissing, setPaginatedMissing] = useState<string[]>([]);
  const [paginatedExtra, setPaginatedExtra] = useState<string[]>([]);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const filteredResults = useMemo(() => {
    const missingTerm = missingSearchTerm.toLowerCase().trim();
    const extraTerm = extraSearchTerm.toLowerCase().trim();

    return {
      missing: missingTerm
        ? result.missing.filter((id) => id.toLowerCase().includes(missingTerm))
        : result.missing,
      extra: extraTerm
        ? result.extra.filter((id) => id.toLowerCase().includes(extraTerm))
        : result.extra,
    };
  }, [result.missing, result.extra, missingSearchTerm, extraSearchTerm]);

  useEffect(() => {
    setMissingCurrentPage(1);
  }, [missingSearchTerm]);

  useEffect(() => {
    setExtraCurrentPage(1);
  }, [extraSearchTerm]);

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

  const handleReset = () => {
    onUpdateResult({ ...initialResult });
  };

  const handleMoveIdentifier = (id: string) => {
    const newResult = {
      ...result,
      missing: result.missing.filter((item) => item !== id),
      extra: [...result.extra, id],
    };
    onUpdateResult(newResult);
  };

  const handleExcludeIdentifier = (id: string) => {
    const newResult = {
      ...result,
      extra: result.extra.filter((item) => item !== id),
      missing: [...result.missing, id],
    };
    onUpdateResult(newResult);
  };

  const handleMoveAllFiltered = () => {
    onUpdateResult({
      ...result,
      missing: [...result.missing, ...filteredResults.missing],
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-4xl bg-white rounded-lg shadow-xl h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <DialogTitle className="text-lg font-semibold">
              비교 결과 상세
            </DialogTitle>
            <div className="flex items-center gap-4">
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                초기화
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-sm text-gray-600 flex gap-4">
              <p>엑셀 파일 식별자 수: {result.totalExcel}개</p>
              <p>예약된 식별자 수: {result.totalApi}개</p>
            </div>

            <div className="space-y-4">
              <Disclosure as="div">
                {({ open }) => (
                  <div>
                    <DisclosureButton className="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-900 hover:bg-blue-100">
                      <span>
                        누락된 식별자
                        {missingSearchTerm
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
                        <div className="flex justify-between items-center">
                          <Search
                            value={missingSearchTerm}
                            onChange={setMissingSearchTerm}
                            placeholder="누락된 식별자 검색..."
                          />
                          {filteredResults.missing.length > 0 && (
                            <button
                              onClick={handleMoveAllFiltered}
                              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md hover:bg-blue-50"
                            >
                              검색결과 전체 추가
                            </button>
                          )}
                        </div>
                        <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                          {paginatedMissing.map((id, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded group hover:bg-gray-100"
                            >
                              <span>{id}</span>
                              <button
                                onClick={() => handleMoveIdentifier(id)}
                                className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 px-2"
                              >
                                추가 →
                              </button>
                            </div>
                          ))}
                        </div>
                        <Pagination
                          total={filteredResults.missing.length}
                          currentPage={missingCurrentPage}
                          pageSize={pageSize}
                          totalPages={Math.ceil(
                            filteredResults.missing.length / pageSize
                          )}
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
                        {extraSearchTerm
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
                        <Search
                          value={extraSearchTerm}
                          onChange={setExtraSearchTerm}
                          placeholder="추가된 식별자 검색..."
                        />
                        <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                          {paginatedExtra.map((id, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded group hover:bg-gray-100"
                            >
                              <span>{id}</span>
                              {!initialResult.extra.includes(id) && (
                                <button
                                  onClick={() => handleExcludeIdentifier(id)}
                                  className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 px-2"
                                >
                                  ← 제외
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Pagination
                          total={filteredResults.extra.length}
                          currentPage={extraCurrentPage}
                          pageSize={pageSize}
                          totalPages={Math.ceil(
                            filteredResults.extra.length / pageSize
                          )}
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
