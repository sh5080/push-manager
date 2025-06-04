"use client";

import { useState } from "react";
import { appSettingApi } from "app/apis/admin/appSetting.api";
import { ExcelHandler } from "@push-manager/shared/utils/excel.util";
import { Toast } from "app/utils/toast.util";
import { Button } from "@commonComponents/inputs/button.component";
import { GetActivityDto } from "@push-manager/shared";
import { formatDate } from "@push-manager/shared/utils/date.util";

interface ActivityExcelDownloaderProps {
  total: number;
  kind?: string;
  memNo?: string;
  eventId?: string;
  level?: number;
}

export function ActivityExcelDownloader({
  total,
  kind,
  memNo,
  eventId,
  level,
}: ActivityExcelDownloaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExcelDownload = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (total === 0) {
        throw new Error("먼저 조회한 뒤 저장이 가능합니다.");
      }

      const dto: GetActivityDto = {
        page: 1,
        pageSize: total,
        ...(kind && { kind: kind as "EVENT_COMPLETED" | "CPA_COMPLETED" }),
        ...(memNo && { memNo }),
        ...(eventId && { eventId }),
        ...(level && { level }),
      };

      Toast.info("엑셀 파일 생성 중입니다...");

      const response = await appSettingApi.getActivity(dto);

      if (response.data.length === 0) {
        throw new Error("다운로드할 데이터가 없습니다.");
      }

      const formattedActivities = response.data.map((activity) => {
        const submissions = activity.value.eventData?.submissions || {};
        const levelDates = {
          level1: submissions['level1'] ? formatDate(submissions['level1'], "-09:00") : "-",
          level2: submissions['level2'] ? formatDate(submissions['level2'], "-09:00") : "-",
          level3: submissions['level3'] ? formatDate(submissions['level3'], "-09:00") : "-",
          level4: submissions['level4'] ? formatDate(submissions['level4'], "-09:00") : "-",
          level5: submissions['level5'] ? formatDate(submissions['level5'], "-09:00") : "-",
          level6: submissions['level6'] ? formatDate(submissions['level6'], "-09:00") : "-",
          level7: submissions['level7'] ? formatDate(submissions['level7'], "-09:00") : "-",
        };

        return {
          id: activity.id,
          kind: activity.kind,
          memNo: activity.value.memNo,
          eventId: activity.value.eventId || "-",
          bestshopNm: activity.bestshopNm || "-",
          level: activity.value.eventData?.level || "-",
          ...levelDates,
          createdAt: formatDate(activity.createdAt, "-09:00"),
        };
      });

      ExcelHandler.convertDataToExcel(formattedActivities, "activity.xlsx");
      Toast.success(
        `총 ${formattedActivities.length}건의 데이터가 다운로드되었습니다.`
      );
    } catch (error: any) {
      Toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExcelDownload}
      disabled={isLoading || total === 0}
      variant="square-line"
    >
      {isLoading ? "다운로드 중..." : "엑셀 다운로드"}
    </Button>
  );
} 