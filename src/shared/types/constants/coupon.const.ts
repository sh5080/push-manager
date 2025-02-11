export const CouponKind = {
  LG_TWINS_TICKET_DISCOUNT: "LG_TWINS_TICKET_DISCOUNT",
  SUBSCRIPTION_REWARD: "SUBSCRIPTION_REWARD",
} as const;

export const CouponIssuanceType = {
  INSTANT: "INSTANT",
  POOL: "POOL",
} as const;

export const CouponDiscountType = {
  AMOUNT: "AMOUNT",
  RATIO: "RATIO",
  PASS: "PASS",
} as const;

export const CouponPoolStatus = {
  PENDING: "PENDING",
  ISSUED: "ISSUED",
  REDEEMED: "REDEEMED",
  CANCELLED: "CANCELLED",
} as const;

export const CouponPoolStatusText = {
  PENDING: "발급대기",
  ISSUED: "발급완료",
  REDEEMED: "사용완료",
  CANCELLED: "발급취소",
} as const;
