import { Dropdown } from "@commonComponents/inputs/dropdown.component";
import { DatePicker } from "@commonComponents/inputs/datePicker.component";
import { CouponPoolStatus } from "@push-manager/shared/types/constants/coupon.const";
import { Input } from "@commonComponents/inputs/input.component";

export const STATUS_OPTIONS = [
  { value: 0, label: "전체", key: "ALL" },
  { value: 1, label: "발급 대기", key: CouponPoolStatus.PENDING },
  { value: 2, label: "발급됨", key: CouponPoolStatus.ISSUED },
  { value: 3, label: "사용됨", key: CouponPoolStatus.REDEEMED },
  { value: 4, label: "취소됨", key: CouponPoolStatus.CANCELLED },
];

export type StatusOption = (typeof STATUS_OPTIONS)[number];

interface SearchFieldsProps {
  conditions: Record<string, boolean>;
  sn: string;
  memNo: string;
  selectedStatus: StatusOption;
  startDate: string;
  endDate: string;
  onSnChange: (value: string) => void;
  onMemNoChange: (value: string) => void;
  onStatusChange: (status: StatusOption) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  memberName?: string;
}

export function SearchFields({
  conditions,
  sn,
  memNo,
  selectedStatus,
  startDate,
  endDate,
  onSnChange,
  onMemNoChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  memberName,
}: SearchFieldsProps) {
  return (
    <div className="space-y-4">
      {conditions.sn && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">쿠폰번호</label>
          <Input
            type="text"
            value={sn}
            onChange={(e) => onSnChange(e.target.value)}
            placeholder="쿠폰번호 입력"
          />
        </div>
      )}

      {conditions.memNo && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">회원번호</label>
          <Input
            type="text"
            value={memNo}
            onChange={(e) => onMemNoChange(e.target.value)}
            placeholder="회원번호 입력"
          />
          {memberName && (
            <span className="text-sm text-blue-600">{memberName}</span>
          )}
        </div>
      )}

      {conditions.status && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">상태</label>
          <Dropdown
            options={STATUS_OPTIONS}
            value={selectedStatus.value}
            onChange={(value) => {
              const newStatus = STATUS_OPTIONS.find(
                (opt) => opt.value === value
              );
              if (newStatus) onStatusChange(newStatus);
            }}
            buttonLabel={(value) =>
              STATUS_OPTIONS.find((opt) => opt.value === value)?.label || ""
            }
            itemLabel={(value) =>
              STATUS_OPTIONS.find((opt) => opt.value === value)?.label || ""
            }
          />
        </div>
      )}

      {conditions.date && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">발급일시</label>
          <DatePicker
            type="date"
            value={startDate}
            onChange={onStartDateChange}
          />
          <span className="text-gray-300 font-light">~</span>
          <DatePicker type="date" value={endDate} onChange={onEndDateChange} />
        </div>
      )}
    </div>
  );
}
