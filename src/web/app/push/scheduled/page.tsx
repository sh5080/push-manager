"use client";

import { useEffect, useState } from "react";
import { pushApi } from "../../apis/push.api";
import { IPushMasterWithMsg } from "@push-manager/shared/types/entities/pushMaster.entity";
import { ScheduledPushDetailModal } from "./modals/scheduledPushDetail.modal";
import { Pagination } from "../../common/components/pagination.component";
import { GetScheduledPushesDto } from "@push-manager/shared";
import { toast } from "react-toastify";
import { PushResultTable } from "../components/pushResultTable.component";

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

      <PushResultTable
        pushes={scheduledPushes.map((push) => ({
          type: "master",
          cmpncode: push.cmpncode,
          title: push.title,
          rstartDate: push.rstartDate,
          step: push.step,
          fpstep: push.fpstep,
        }))}
        onPushSelect={setSelectedPush}
        onRefresh={handleRefresh}
      />

      <Pagination
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

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
