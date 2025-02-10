import {
  CouponPoolStatus,
  CouponDiscountType,
} from "@push-manager/shared/types/constants/coupon.const";

type StatusType = (typeof CouponPoolStatus)[keyof typeof CouponPoolStatus];
type DiscountType =
  (typeof CouponDiscountType)[keyof typeof CouponDiscountType];

export const getCouponStatusChipText = (status: StatusType) => {
  switch (status) {
    case CouponPoolStatus.PENDING:
      return "발급대기";
    case CouponPoolStatus.ISSUED:
      return "발급완료";
    case CouponPoolStatus.REDEEMED:
      return "사용완료";
    case CouponPoolStatus.CANCELLED:
      return "발급취소";
    default:
      return status;
  }
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
