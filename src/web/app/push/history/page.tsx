"use client";

import { useEffect, useState } from "react";
import {
  IPushStsMsg,
  IPushStsMsgWithDetail,
} from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { pushApi } from "app/apis/push.api";
import { Search } from "@commonComponents/inputs/search.component";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { DatePicker } from "@commonComponents/inputs/datePicker.component";
import { Button } from "@commonComponents/inputs/button.component";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { Toast } from "app/utils/toast.util";
import { Dropdown } from "@commonComponents/inputs/dropdown.component";
import { PushResultTable } from "../components/pushResultTable.component";
import { convertValueToStepEnum } from "app/utils/convertEnum.util";
import { StepEnumType } from "app/types/prop.type";
import { DetailModal } from "../modals/detail.modal";

export default function PushHistoryPage() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [selectedPush, setSelectedPush] =
    useState<IPushStsMsgWithDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStep, setSelectedStep] = useState<StepEnumType>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

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
        title: searchQuery,
        step: convertValueToStepEnum(selectedStep),
      };

      const data = await pushApi.getTargetPushes(dto);

      setPushes(data.data);
      setTotalPages(data.totalPages);
      setTotalCount(data.total);
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
  const handlePushClick = async (push: IPushStsMsg) => {
    try {
      const pushDetail = await pushApi.getPushDetail(push.idx);
      setSelectedPush(pushDetail);
      setIsModalOpen(true);
    } catch (error: any) {
      Toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">발송 내역 조회</h1>

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
                defaultPlaceholder="제목 검색"
                size="38"
              />
            </div>

            <div className="flex gap-3">
              <Dropdown
                options={STEP_OPTIONS}
                value={selectedStep}
                onChange={(value) => setSelectedStep(value as StepEnumType)}
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
              rStartDate: push.sendDate!,
              step: push.step!,
              ...push,
            }))}
            onPushSelect={handlePushClick}
            onRefresh={fetchPushes}
            pagination={{
              total: totalCount,
              currentPage: currentPage,
              pageSize: pageSize,
              totalPages: totalPages,
              onPageChange: setCurrentPage,
              onPageSizeChange: setPageSize,
            }}
          />
        </div>
      </div>

      <DetailModal
        push={selectedPush}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPush(null);
        }}
      />
    </div>
  );
}
