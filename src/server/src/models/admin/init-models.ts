import type { Sequelize } from "sequelize";

import { SubscriptionRewardRequest as _SubscriptionRewardRequest } from "../admin/SubscriptionRewardRequest";
import type {
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestCreationAttributes,
} from "../admin/SubscriptionRewardRequest";
import { Member as _Member } from "../admin/Member";
import type {
  MemberAttributes,
  MemberCreationAttributes,
} from "../admin/Member";
import { Coupon as _Coupon } from "../admin/Coupon";
import type {
  CouponAttributes,
  CouponCreationAttributes,
} from "../admin/Coupon";
import { CouponPool as _CouponPool } from "../admin/CouponPool";
import type {
  CouponPoolAttributes,
  CouponPoolCreationAttributes,
} from "../admin/CouponPool";

export {
  _SubscriptionRewardRequest as SubscriptionRewardRequest,
  _Member as Member,
  _Coupon as Coupon,
  _CouponPool as CouponPool,
};
export type {
  SubscriptionRewardRequestAttributes,
  SubscriptionRewardRequestCreationAttributes,
  MemberAttributes,
  MemberCreationAttributes,
  CouponAttributes,
  CouponCreationAttributes,
  CouponPoolAttributes,
  CouponPoolCreationAttributes,
};

export function initAdminModels(sequelize: Sequelize) {
  const SubscriptionRewardRequest =
    _SubscriptionRewardRequest.initModel(sequelize);
  const Member = _Member.initModel(sequelize);
  const Coupon = _Coupon.initModel(sequelize);
  const CouponPool = _CouponPool.initModel(sequelize);
  return {
    SubscriptionRewardRequest: SubscriptionRewardRequest,
    Member: Member,
    Coupon: Coupon,
    CouponPool: CouponPool,
  };
}
