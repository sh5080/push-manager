import {
  CouponPoolStatus,
  CouponDiscountType,
} from "@push-manager/shared/types/constants/coupon.const";

type StatusType = (typeof CouponPoolStatus)[keyof typeof CouponPoolStatus];
type DiscountType =
  (typeof CouponDiscountType)[keyof typeof CouponDiscountType];

export const getStatusChipStyle = (status: StatusType) => {
  switch (status) {
    case CouponPoolStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case CouponPoolStatus.ISSUED:
      return "bg-green-100 text-green-800";
    case CouponPoolStatus.REDEEMED:
      return "bg-blue-100 text-blue-800";
    case CouponPoolStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getDiscountTypeChipStyle = (type: DiscountType) => {
  switch (type) {
    case CouponDiscountType.AMOUNT:
      return "bg-indigo-100 text-indigo-800";
    case CouponDiscountType.RATIO:
      return "bg-purple-100 text-purple-800";
    case CouponDiscountType.PASS:
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getYNChipStyle = (value?: "Y" | "N") => {
  return value === "Y"
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";
};
