import {
  CouponPoolStatus,
  CouponDiscountType,
  CouponPoolStatusText,
} from "@push-manager/shared/types/constants/coupon.const";

type StatusType = keyof typeof CouponPoolStatusText;
type DiscountType =
  (typeof CouponDiscountType)[keyof typeof CouponDiscountType];

export const getCouponStatusChipText = (status: StatusType) => {
  return CouponPoolStatusText[status] || status;
};

export const getDiscountTypeChipText = (type: DiscountType) => {
  switch (type) {
    case CouponDiscountType.AMOUNT:
      return "정액할인";
    case CouponDiscountType.RATIO:
      return "정률할인";
    case CouponDiscountType.PASS:
      return "교환권";
    default:
      return type;
  }
};

export const getYNChipText = (
  value?: "Y" | "N",
  trueText = "동의",
  falseText = "미동의"
) => {
  return value === "Y" ? trueText : falseText;
};
