import { CouponPool } from "./CouponPool";
import { Coupon } from "./Coupon";

export function initializeAdminRelations() {
  CouponPool.belongsTo(Coupon, {
    foreignKey: "couponId",
    targetKey: "id",
  });
}
