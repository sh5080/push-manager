"use client";

import { useEffect, useState } from "react";
import { pushApi } from "../../apis/push.api";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";

import { ScheduledPushDetailModal } from "./modals/scheduledPushDetail.modal";
import { Pagination } from "../../common/components/pagination.component";
import { GetScheduledPushesDto } from "@push-manager/shared";
import { toast } from "react-toastify";
import { InfoTooltip } from "app/common/components/infoTooltip.component";
import { StatusGuideContent } from "app/push/components/guides/statusGuide.component";
import { StatusChip } from "app/common/components/statusChip.component";
import { StatusChipType } from "app/types/prop.type";
import { HiRefresh } from "react-icons/hi";

export default function ScheduledPushPage() {
  const [scheduledPushes, setScheduledPushes] = useState<IPushMasterWithMsg[]>(
    []
  );
  const [selectedPush, setSelectedPush] = useState<IPushMasterWithMsg | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchScheduledPushes = async () => {
    try {
      const dto: GetScheduledPushesDto = {
        page: currentPage,
        pageSize: pageSize,
      };
      const response = await pushApi.getScheduledPushes(dto);
      setScheduledPushes(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("예약된 푸시 조회 실패");
    }
  };

  useEffect(() => {
    fetchScheduledPushes();
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchScheduledPushes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">타겟 푸시 발송 현황</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                캠페인 코드
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                발송 예정 시각
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                상태
                <InfoTooltip
                  content={
                    <StatusGuideContent type={"master" as StatusChipType} />
                  }
                  width="w-[420px]"
                  position="left"
                />
                <button
                  onClick={handleRefresh}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  title="새로고침"
                >
                  <HiRefresh className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduledPushes.map((push) => (
              <tr
                key={push.cmpncode}
                onClick={() => setSelectedPush(push)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.cmpncode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {push.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(push.rstartDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusChip
                    type="master"
                    step={push.step}
                    fpstep={push.fpstep}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {selectedPush && (
        <ScheduledPushDetailModal
          isOpen={!!selectedPush}
          onClose={() => setSelectedPush(null)}
          push={selectedPush}
        />
      )}
    </div>
  );
}
