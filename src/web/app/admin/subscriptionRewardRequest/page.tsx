"use client";

import { useState } from "react";
import { PageHeader } from "@commonComponents/layout/pageHeader.component";
import { SubscriptionRewardList } from "./components/subscriptionRewardList.component";
import { subscriptionApi } from "app/apis/admin/subscription.api";
import { Toast } from "app/utils/toast.util";
import { DatePicker } from "@commonComponents/inputs/datePicker.component";
import { ISubscriptionRewardRequest } from "@push-manager/shared/types/entities/admin/subscriptionRewardRequest.entity";
import { ExcelHandler } from "@push-manager/shared/utils/excel.util";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { Button } from "@commonComponents/inputs/button.component";
import { ButtonText } from "@push-manager/shared/types/constants/common.const";

export default function SubscriptionRewardRequestPage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [rewards, setRewards] = useState<ISubscriptionRewardRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchRewards = async () => {
    try {
      if (!startDate || !endDate) {
        throw new Error("날짜를 선택해주세요.");
      }
      setIsLoading(true);
      // KST 00:00 = 전날 15:00 UTC
      const startDateTime = new Date(startDate);
      startDateTime.setUTCHours(15, 0, 0, 0);
      startDateTime.setUTCDate(startDateTime.getUTCDate() - 1);

      const endDateTime = new Date(endDate);
      endDateTime.setUTCHours(15, 0, 0, 0);
      endDateTime.setUTCDate(endDateTime.getUTCDate());

      const response = await subscriptionApi.getSubscriptionRewardRequests({
        startAt: startDateTime,
        endAt: endDateTime,
      });

      setRewards(response);
    } catch (error: any) {
      Toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcelDownload = () => {
    try {
      if (rewards.length === 0) {
        throw new Error("먼저 조회한 뒤 저장이 가능합니다.");
      }
      const formattedRewards = rewards.map((reward) => ({
        ...reward,
        createdAt: formatDate(reward.createdAt, "+00:00"),
        gradeStDate: formatDate(reward.gradeStDate, "+00:00"),
      }));
      ExcelHandler.convertDataToExcel(formattedRewards);
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="구독쿠폰 발급 내역 조회"
          description="특정 기간의 구독쿠폰 발급 내역을 조회할 수 있습니다."
        />

        <div className="flex items-center gap-4 mb-6">
          <DatePicker type="date" value={startDate} onChange={setStartDate} />
          <span className="text-gray-300 font-light">~</span>
          <DatePicker type="date" value={endDate} onChange={setEndDate} />

          <div className="flex gap-2">
            <Button variant="solid" size="38" onClick={fetchRewards}>
              조회하기
            </Button>

            <Button
              onClick={handleExcelDownload}
              disabled={isLoading || rewards.length === 0}
              variant="square-line"
            >
              {isLoading ? ButtonText.DOWNLOAD_LOADING : ButtonText.EXCEL_DOWNLOAD}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <SubscriptionRewardList rewards={rewards} />
        </div>
      </div>
    </div>
  );
}
