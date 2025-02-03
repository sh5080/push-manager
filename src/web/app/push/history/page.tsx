"use client";

import { useEffect, useState } from "react";
import { PushDetail } from "../components/pushDetail.component";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { pushApi } from "app/apis/push.api";
import { Search } from "app/common/components/search.component";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { DatePicker } from "app/common/components/datePicker.component";
import { Button } from "app/common/components/button.component";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { Toast } from "app/utils/toast.util";
import { Dropdown } from "app/common/components/dropdown.component";
import { PushResultTable } from "../components/pushResultTable.component";
import { convertValueToStepEnum } from "app/utils/convertEnum.util";

export default function PushHistoryPage() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [selectedPush, setSelectedPush] = useState<IPushStsMsg | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStep, setSelectedStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  const [startDate, setStartDate] = useState<string>(formatDate(new Date()));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const STEP_OPTIONS = [
    { value: 0, label: "모든 상태" },
    { value: 1, label: "발송 대기" },
    { value: 2, label: "발송 중" },
    { value: 3, label: "발송 완료" },
    { value: 4, label: "발송 실패" },
  ];

  const fetchPushes = async () => {
    try {
      const dto = {
        page: currentPage,
        pageSize: pageSize,
        startDate: formatDate(startDate).slice(0, 10),
        endDate: formatDate(endDate).slice(0, 10),
        targetMode: AppIdEnum.PROD,
        title: searchQuery || undefined,
        step: convertValueToStepEnum(selectedStep),
      };

      const data = await pushApi.getTargetPushes(dto);

      setPushes(data.data);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPushes();
  }, [currentPage, pageSize]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPushes();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">타겟 푸시 내역 조회</h1>

        <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <DatePicker
                type="date"
                value={startDate}
                onChange={setStartDate}
              />
              <span className="text-gray-300 font-light">~</span>
              <DatePicker type="date" value={endDate} onChange={setEndDate} />
            </div>

            <div className="flex-1">
              <Search
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="제목 또는 발송자로 검색"
                size="38"
              />
            </div>

            <div className="flex gap-3">
              <Dropdown
                options={STEP_OPTIONS}
                value={selectedStep}
                onChange={(value) =>
                  setSelectedStep(value as 0 | 1 | 2 | 3 | 4 | 5)
                }
                buttonLabel={(value) =>
                  STEP_OPTIONS.find((opt) => opt.value === value)?.label ||
                  "상태 선택"
                }
                itemLabel={(value) =>
                  STEP_OPTIONS.find((opt) => opt.value === value)?.label || ""
                }
                size="38"
              />

              <Button variant="solid" size="38" onClick={handleSearch}>
                조회하기
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <PushResultTable
            pushes={pushes.map((push) => ({
              type: "message",
              title: push.title!,
              rstartDate: push.senddate!,
              step: push.step!,
              ...push,
            }))}
            onPushSelect={setSelectedPush}
            onRefresh={fetchPushes}
            pagination={{
              total: totalPages,
              currentPage: currentPage,
              pageSize: pageSize,
              totalPages: totalPages,
              onPageChange: setCurrentPage,
              onPageSizeChange: setPageSize,
            }}
          />
          {pushes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                조회된 푸시 내역이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedPush && (
        <PushDetail push={selectedPush} onClose={() => setSelectedPush(null)} />
      )}
    </div>
  );
}
