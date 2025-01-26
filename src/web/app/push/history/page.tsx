"use client";

import { useEffect, useState } from "react";
import { PushList } from "../components/pushList.component";
import { PushDetail } from "../components/pushDetail.component";
import { PageHeader } from "../../common/components/pageHeader.component";
import { IPushStsMsg } from "@push-manager/shared/types/entities/pushStsMsg.entity";
import { pushApi } from "app/apis/push.api";
import { Search } from "app/common/components/search.component";
import { AppIdEnum } from "@push-manager/shared/types/constants/common.const";
import { DatePicker } from "app/common/components/datePicker.component";
import { Button } from "app/common/components/button.component";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { Toast } from "app/utils/toast.util";
import { Dropdown } from "app/common/components/dropdown.component";

export default function PushHistoryPage() {
  const [pushes, setPushes] = useState<IPushStsMsg[]>([]);
  const [selectedPush, setSelectedPush] = useState<IPushStsMsg | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [period, setPeriod] = useState("7d");
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));

  const statusOptions = [
    { value: 0, label: "모든 상태" },
    { value: 1, label: "완료" },
    { value: 2, label: "실패" },
    { value: 3, label: "대기" },
  ];

  const periodOptions = [
    { value: 7, label: "최근 7일" },
    { value: 30, label: "최근 30일" },
    { value: 90, label: "최근 90일" },
    { value: -1, label: "직접 설정" },
  ];

  useEffect(() => {
    fetchPushes();
  }, []);

  const fetchPushes = async () => {
    try {
      const dto = {
        page: 1,
        pageSize: 5,
        startDate: formatDate(startDate).slice(0, 10),
        endDate: formatDate(endDate).slice(0, 10),
        targetMode: AppIdEnum.PROD,
      };

      const data = await pushApi.getTargetPushes(dto);
      setPushes(data.data);
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  const handleSearch = () => {
    // TODO: API 호출 시 검색 조건 적용
    fetchPushes();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="푸시 알림 관리"
          description={
            <span className="whitespace-pre-line">
              타겟 푸시 알림을 생성하고 발송 현황을 관리할 수 있습니다.{"\n"}
              전체푸시는 기존 핑거푸시 콘솔을 사용해주세요.
            </span>
          }
        />

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
                options={statusOptions}
                value={parseInt(status) || 0}
                onChange={(value) => setStatus(value.toString())}
                buttonLabel={(value) =>
                  statusOptions.find((opt) => opt.value === value)?.label ||
                  "상태 선택"
                }
                itemLabel={(value) =>
                  statusOptions.find((opt) => opt.value === value)?.label || ""
                }
                size="38"
              />
              <Dropdown
                options={periodOptions}
                value={parseInt(period) || 7}
                onChange={(value) => setPeriod(value.toString())}
                buttonLabel={(value) =>
                  periodOptions.find((opt) => opt.value === value)?.label ||
                  "기간 선택"
                }
                itemLabel={(value) =>
                  periodOptions.find((opt) => opt.value === value)?.label || ""
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
          {/* <PushList pushes={pushes} onPushSelect={setSelectedPush} /> */}
        </div>
      </div>

      {selectedPush && (
        <PushDetail push={selectedPush} onClose={() => setSelectedPush(null)} />
      )}
    </div>
  );
}
