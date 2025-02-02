import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { HiX, HiRefresh } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Pagination } from "app/common/components/pagination.component";
import { pushApi } from "app/apis/push.api";
import { Toast } from "app/utils/toast.util";
import { ExcelComparison } from "../components/excelComparison.component";
import { IPushQueue, Rnum } from "@push-manager/shared";
import { StatusChip } from "app/common/components/statusChip.component";
import { InfoTooltip } from "app/common/components/infoTooltip.component";
import { ExcelGuideContent } from "app/push/components/guides/excelGuide.component";

interface PushReservationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  cmpncode: number;
}

export function PushReservationStatusModal({
  isOpen,
  onClose,
  cmpncode,
}: PushReservationStatusModalProps) {
  const [queues, setQueues] = useState<(IPushQueue & Rnum)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchQueues();
    }
  }, [isOpen, currentPage, pageSize]);

  const fetchQueues = async () => {
    setIsLoading(true);
    try {
      const response = await pushApi.getPushQueues({
        cmpncode,
        page: currentPage,
        pageSize,
      });
      setQueues(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      Toast.error("식별자 목록 조회 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchQueues();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <DialogTitle className="text-lg font-semibold">
              예약 상태 확인
            </DialogTitle>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 -mb-4">
              <label className="block text-sm font-medium text-gray-700">
                비교할 엑셀 업로드
              </label>
              <InfoTooltip
                content={<ExcelGuideContent />}
                position="right"
                width="w-[400px]"
              />
            </div>
            <ExcelComparison queues={queues} />

            {/* 식별자 목록 테이블 */}
            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      식별자
                    </th>
                    <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleRefresh}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                          title="새로고침"
                        >
                          <HiRefresh className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center">
                        로딩 중...
                      </td>
                    </tr>
                  ) : (
                    queues.map((queue, index) => (
                      <tr key={queue.queueIdx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {queue.identify}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusChip type="master" step={queue.step!} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="mt-4">
                <Pagination
                  total={total}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                />
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
