"use client";

import { useState } from "react";
import { CouponPoolStatus } from "@push-manager/shared/types/constants/coupon.const";
import { formatDate } from "@push-manager/shared/utils/date.util";
import { couponApi } from "app/apis/admin/coupon.api";
import { ExcelHandler } from "@push-manager/shared/utils/excel.util";
import { Toast } from "app/utils/toast.util";
import { Button } from "@commonComponents/inputs/button.component";
import { GetCouponsDto } from "@push-manager/shared";

interface CouponExcelDownloaderProps {
  total: number;
  sn?: string;
  status?: string;
  memNo?: string;
  startDate?: string;
  endDate?: string;
}

export function CouponExcelDownloader({
  total,
  sn,
  status,
  memNo,
  startDate,
  endDate,
}: CouponExcelDownloaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExcelDownload = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      if (total === 0) {
        throw new Error("먼저 조회한 뒤 저장이 가능합니다.");
      }

      // 전체 데이터를 가져오기 위해 pageSize를 total로 설정하여 API 호출
      const dto: GetCouponsDto = {
        type: "app",
        page: 1,
        pageSize: total,
        ...(sn && { sn }),
        ...(status && {
          status:
            status as (typeof CouponPoolStatus)[keyof typeof CouponPoolStatus],
        }),
        ...(memNo && { memNo }),
        ...(startDate && {
          redeemedAtFrom: formatDate(startDate, "+09:00"),
        }),
        ...(endDate && {
          redeemedAtTo: formatDate(endDate, "+09:00", "+1d"),
        }),
      };

      Toast.info("엑셀 파일 생성 중입니다...");

      const response = await couponApi.getCoupons(dto);

      if (response.data.length === 0) {
        throw new Error("다운로드할 데이터가 없습니다.");
      }

      const formattedCoupons = response.data.map((coupon) => ({
        id: coupon.id,
        sn: coupon.sn,
        status: coupon.status,
        couponName: coupon.coupon?.name,
        memNo: coupon.member?.memNo,
        "currentGrade (현재 등급)": coupon.newbestInfo?.LGE_CUST_GRD_NM_DISP,
        "gradeStartDate (현재 등급 시작일)":
          coupon.newbestInfo?.CUST_GRD_ST_DATE,
        "gradeAtIssue (발급당시 등급)":
          coupon.gradeAtIssue === "AS00"
            ? "다이아몬드 블랙"
            : coupon.gradeAtIssue === "AS01"
            ? "다이아몬드"
            : coupon.gradeAtIssue === "AS02"
            ? "플래티넘"
            : coupon.gradeAtIssue === "AS03"
            ? "골드"
            : coupon.gradeAtIssue === "AS04"
            ? "실버"
            : coupon.gradeAtIssue === "AS05"
            ? "브론즈"
            : "-",
        createdAt: formatDate(coupon.createdAt, "-09:00"),
        updatedAt: formatDate(coupon.updatedAt, "-09:00"),
        redeemedAt: coupon.redeemedAt
          ? formatDate(coupon.redeemedAt, "-09:00")
          : "",
        issuedAt: coupon.issuedAt ? formatDate(coupon.issuedAt, "-09:00") : "",
        startDate: formatDate(coupon.startDate, "-09:00"),
        endDate: formatDate(coupon.endDate, "-09:00"),
      }));

      ExcelHandler.convertDataToExcel(formattedCoupons);
      Toast.success(
        `총 ${formattedCoupons.length}건의 데이터가 다운로드되었습니다.`
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
