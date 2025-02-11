"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@commonComponents/layout/pageHeader.component";
import { Button } from "@commonComponents/inputs/button.component";
import { CouponList } from "./components/couponList.component";
import { couponApi } from "app/apis/admin/coupon.api";
import { Toast } from "app/utils/toast.util";
import { GetCouponsDto, IMembershipAppCoupon } from "@push-manager/shared";
import { CouponPoolStatus } from "@push-manager/shared/types/constants/coupon.const";
import { SearchConditions } from "./components/searchConditions.component";
import {
  SearchFields,
  STATUS_OPTIONS,
  StatusOption,
} from "./components/searchFields.component";
import { formatDate } from "@push-manager/shared/utils/date.util";

export default function CouponPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sn, setSn] = useState("");
  const [status, setStatus] = useState<string>(STATUS_OPTIONS[0].key);
  const [memNo, setMemNo] = useState("");
  const [coupons, setCoupons] = useState<IMembershipAppCoupon[]>([]);
  const [total, setTotal] = useState(0);
  const [memberName, setMemberName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusOption>(
    STATUS_OPTIONS[0]
  );

  const [searchConditions, setSearchConditions] = useState({
    sn: false,
    memNo: false,
    status: false,
    date: false,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async (page = currentPage) => {
    try {
      const dto: GetCouponsDto = {
        type: "app",
        page,
        pageSize,
        ...(sn && { sn }),
        ...(status && {
          status:
            status as (typeof CouponPoolStatus)[keyof typeof CouponPoolStatus],
        }),
        ...(memNo && { memNo }),
        ...(startDate && {
          redeemedAtFrom: new Date(formatDate(startDate, "+09:00")),
        }),
        ...(endDate && {
          redeemedAtTo: new Date(formatDate(endDate, "+09:00", "+1d")),
        }),
      };

      const response = await couponApi.getCoupons(dto);
      if (response.memberName) {
        setMemberName(response.memberName);
      }
      if (response.data.length) {
        setCoupons(response.data);
        setTotal(response.total);
        setCurrentPage(page);
      } else {
        setCoupons([]);
        setTotal(0);
        setCurrentPage(1);
        Toast.info("조회 결과가 없습니다.");
      }
    } catch (error: any) {
      Toast.error(error.message);
    }
  };

  const handlePageChange = (page: number) => {
    fetchCoupons(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    fetchCoupons(1);
  };

  const handleReset = () => {
    setSn("");
    setMemNo("");
    setStatus(STATUS_OPTIONS[0].key);
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    setMemberName("");
    setCoupons([]);
    setTotal(0);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchCoupons(1);
  };

  const handleSearchConditionChange = (key: string, checked: boolean) => {
    setSearchConditions((prev) => ({ ...prev, [key]: checked }));
  };

  const handleStatusChange = (newStatus: StatusOption) => {
    setSelectedStatus(newStatus);
    setStatus(newStatus.key);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageHeader
          title="멤버십앱 쿠폰 발급 내역 조회"
          description="멤버십앱 쿠폰 발급 내역을 조회할 수 있습니다."
        />

        <div className="bg-white p-4 rounded-lg mb-6 space-y-4">
          <SearchConditions
            conditions={searchConditions}
            onChange={handleSearchConditionChange}
          />

          <SearchFields
            conditions={searchConditions}
            sn={sn}
            memNo={memNo}
            selectedStatus={selectedStatus}
            startDate={startDate}
            endDate={endDate}
            onSnChange={setSn}
            onMemNoChange={setMemNo}
            onStatusChange={handleStatusChange}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            memberName={memberName}
          />

          <div className="flex justify-end gap-2">
            <Button variant="line" size="38" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="solid" size="38" onClick={handleSearch}>
              조회하기
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <CouponList
            coupons={coupons}
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
