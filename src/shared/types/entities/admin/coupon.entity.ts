import {
  CouponKind,
  CouponIssuanceType,
  CouponDiscountType,
  CouponPoolStatus,
} from "../../constants/coupon.const";
import {
  IRetrieveMoblCoupCustArrayNewRes,
  IRetrieveObsUserMbsCouponListRes,
} from "./newbest.entity";

export interface ICouponPool {
  id: string;
  sn: string;
  status: (typeof CouponPoolStatus)[keyof typeof CouponPoolStatus];
  issuedAt?: Date;
  redeemedAt?: Date;
  startDate: Date;
  endDate: Date;
  couponId: string;
  memberId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon {
  id: string;
  kind: (typeof CouponKind)[keyof typeof CouponKind];
  name: string;
  description: string;
  instructions: string;
  issuanceType: (typeof CouponIssuanceType)[keyof typeof CouponIssuanceType];
  discountType: (typeof CouponDiscountType)[keyof typeof CouponDiscountType];
  discountValue: number;
  maxDiscount: number;
  policy: Record<string, any>;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICouponPoolWithCoupon extends ICouponPool {
  coupon: ICoupon;
}

export interface IMemberCommonCoupons {
  parking: IRetrieveMoblCoupCustArrayNewRes;
  free: IRetrieveMoblCoupCustArrayNewRes;
}

export interface IMemberObsCoupons {
  obs: IRetrieveObsUserMbsCouponListRes[];
}
