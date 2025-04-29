import { memberGrade } from "../../constants/common.const";
import {
  CouponKind,
  CouponIssuanceType,
  CouponDiscountType,
  CouponPoolStatus,
} from "../../constants/coupon.const";
import { IMember } from "./member.entity";
import {
  IRetrieveMoblCoupCustArrayNewRes,
  IRetrieveObsUserMbsCouponListRes,
  IRetrieveRestMbsCustRes,
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
  gradeAtIssue?: (typeof memberGrade)[keyof typeof memberGrade];
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

export interface IMembershipAppCoupon extends ICouponPool {
  coupon: ICoupon;
  member?: IMember;
  newbestInfo?: IRetrieveRestMbsCustRes;
}

export interface INewbestCommonCoupons {
  parking: IRetrieveMoblCoupCustArrayNewRes[];
  free: IRetrieveMoblCoupCustArrayNewRes[];
}

export interface INewbestObsCoupons {
  obs: IRetrieveObsUserMbsCouponListRes[];
}
