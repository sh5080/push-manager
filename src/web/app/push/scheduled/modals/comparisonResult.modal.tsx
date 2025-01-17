import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { useState, useEffect, useMemo } from "react";
import { useLoadingStore } from "app/store";
import { QueueSubmitButton } from "../components/queueSubmitButton.component";
import { IdentifierList } from "../components/identifierList.component";

interface ComparisonResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ComparisonResult;
  initialResult: ComparisonResult;
  onUpdateResult: (newResult: ComparisonResult) => void;
  onSubmitQueue: (identifies: string[], cmpncode: number) => Promise<void>;
  cmpncode: number;
}

interface ComparisonResult {
  missing: string[];
  extra: string[];
  existing: string[];
  totalExcel: number;
  totalApi: number;
}

export function ComparisonResultModal({
  isOpen,
  onClose,
  result,
  initialResult,
  onUpdateResult,
  onSubmitQueue,
  cmpncode,
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

  const handleMoveAllFiltered = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 0)); // UI 블로킹 방지
      const newResult = {
        ...result,
        missing: result.missing.filter(
          (id) => !filteredResults.missing.includes(id)
        ),
        extra: [...result.extra, ...filteredResults.missing],
      };
      onUpdateResult(newResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    onSubmitQueue(result.extra, cmpncode);
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
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-sm text-gray-600 flex gap-4">
              <p>엑셀 파일 식별자 수: {result.totalExcel}건</p>
              <p>예약 대기열 식별자 수: {result.totalApi}건</p>
            </div>

            <div className="space-y-4">
              <IdentifierList
                title="누락된 식별자"
                identifiers={result.missing}
                searchTerm={missingSearchTerm}
                onSearchChange={setMissingSearchTerm}
                filteredCount={filteredResults.missing.length}
                totalCount={result.missing.length}
                currentPage={missingCurrentPage}
                onPageChange={setMissingCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                paginatedItems={paginatedMissing}
                onItemAction={handleMoveIdentifier}
                actionLabel="추가 →"
                showMoveAllButton
                onMoveAll={handleMoveAllFiltered}
              />

              <IdentifierList
                title="추가된 식별자"
                identifiers={result.extra}
                searchTerm={extraSearchTerm}
                onSearchChange={setExtraSearchTerm}
                filteredCount={filteredResults.extra.length}
                totalCount={result.extra.length}
                currentPage={extraCurrentPage}
                onPageChange={setExtraCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                paginatedItems={paginatedExtra}
                onItemAction={handleExcludeIdentifier}
                actionLabel="← 제외"
                showResetButton
                onReset={handleReset}
                disableAction={(id) => initialResult.extra.includes(id)}
                actionClassName="text-red-600 hover:text-red-700"
              />
            </div>

            <QueueSubmitButton
              extraCount={result.extra.length}
              onSubmit={handleSubmit}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
