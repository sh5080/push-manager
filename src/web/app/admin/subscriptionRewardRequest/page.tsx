"use client";

import { useState } from "react";
import { PageHeader } from "../../common/components/pageHeader.component";
import { SubscriptionRewardList } from "./components/subscriptionRewardList.component";
import { subscriptionApi } from "app/apis/admin/subscription.api";
import { Toast } from "app/utils/toast.util";
import { DatePicker } from "../../common/components/datePicker.component";
import { ISubscriptionRewardRequest } from "@push-manager/shared/types/entities/admin/subscriptionRewardRequest.entity";
import { ExcelHandler } from "@push-manager/shared/utils/excel.util";
import { formatDateForExcel } from "@push-manager/shared/utils/date.util";
import Image from "next/image";
import { Button } from "../../common/components/button.component";

export default function SubscriptionRewardRequestPage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [rewards, setRewards] = useState<ISubscriptionRewardRequest[]>([]);

  const fetchRewards = async () => {
    try {
      if (!startDate || !endDate) {
        throw new Error("날짜를 선택해주세요.");
      }

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
    }
  };

  const handleExcelDownload = () => {
    try {
      if (rewards.length === 0) {
        throw new Error("먼저 조회한 뒤 저장이 가능합니다.");
      }
      const formattedRewards = rewards.map((reward) => ({
        ...reward,
        createdAt: formatDateForExcel(reward.createdAt, "KST"),
        gradeStDate: formatDateForExcel(reward.gradeStDate, "KST"),
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
          title="구독쿠폰 조회"
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
              variant="green-point"
              size="38"
              onClick={handleExcelDownload}
              disabled={rewards.length === 0}
              title="엑셀 다운로드"
            >
              <Image
                src="/icons/excel.svg"
                width={20}
                height={20}
                alt="엑셀 다운로드"
                className={rewards.length === 0 ? "opacity-40" : ""}
              />
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
