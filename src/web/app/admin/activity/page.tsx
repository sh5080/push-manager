"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@commonComponents/layout/pageHeader.component";
import { Button } from "@commonComponents/inputs/button.component";
import { Toast } from "app/utils/toast.util";
import { GetActivityDto } from "@push-manager/shared";
import { SearchConditions } from "./components/searchConditions.component";
import { ActivityExcelDownloader } from "./components/excelDownload.component";
import { SearchFields } from "./components/searchFields.component";
import { ActivityList } from "./components/activityList.component";
import { activityApi } from "app/apis/admin/acitivity.api";
import { ExcelUploadModal } from "./modals/excelUpload.modal";

export default function ActivityPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [kind, setKind] = useState<string>("EVENT_COMPLETED");
  const [memNo, setMemNo] = useState("");
  const [eventId, setEventId] = useState("");
  const [level, setLevel] = useState<number | undefined>();
  const [activities, setActivities] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchConditions, setSearchConditions] = useState({
    kind: false,
    memNo: false,
    eventId: false,
    level: false,
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async (page = currentPage) => {
    try {
      const dto: GetActivityDto = {
        page,
        pageSize,
        ...(kind && { kind: kind as "EVENT_COMPLETED" | "CPA_COMPLETED" }),
        ...(memNo && { memNo }),
        ...(eventId && { eventId }),
        ...(level && { level }),
      };
      const response = await activityApi.getActivity(dto);
      if (response.data.length) {
        setActivities(response.data);
        setTotal(response.total);
        setCurrentPage(page);
      } else {
        setActivities([]);
        setTotal(0);
        setCurrentPage(1);
        Toast.info("조회 결과가 없습니다.");
      }
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  const handlePageChange = (page: number) => {
    fetchActivities(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    fetchActivities(1);
  };

  const handleReset = () => {
    setKind("");
    setMemNo("");
    setEventId("");
    setLevel(undefined);
    setCurrentPage(1);
    setActivities([]);
    setTotal(0);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchActivities(1);
  };

  const handleSearchConditionChange = (key: string, checked: boolean) => {
    setSearchConditions((prev) => ({ ...prev, [key]: checked }));

    if (!checked) {
      switch (key) {
        case "kind":
          setKind("");
          break;
        case "memNo":
          setMemNo("");
          break;
        case "eventId":
          setEventId("");
          break;
        case "level":
          setLevel(undefined);
          break;
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="활동기록 조회"
          description="사용자의 활동기록을 조회할 수 있습니다."
        />

        <div className="bg-white p-4 rounded-lg mb-6 space-y-4">
          <SearchConditions
            conditions={searchConditions}
            onChange={handleSearchConditionChange}
          />

          <SearchFields
            conditions={searchConditions}
            kind={kind}
            memNo={memNo}
            eventId={eventId}
            level={level}
            onKindChange={setKind}
            onMemNoChange={setMemNo}
            onEventIdChange={setEventId}
            onLevelChange={setLevel}
          />

          <div className="flex justify-end gap-2">
            <Button variant="line" size="38" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="solid" size="38" onClick={handleSearch}>
              조회하기
            </Button>
      
            
          </div>
          <div className="flex justify-end gap-2 mb-4">
          <ActivityExcelDownloader
              total={total}
              kind={kind}
              memNo={memNo}
              eventId={eventId}
              level={level}
            />
          <Button variant="square-green-transparent" size="38" onClick={handleOpenModal}>
            선호매장 갱신
          </Button>
        </div>

        <ExcelUploadModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <ActivityList
            activities={activities}
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
} 