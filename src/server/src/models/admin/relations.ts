import { CouponPool } from "./CouponPool";
import { Coupon } from "./Coupon";
import { Member } from "./Member";
export function initializeAdminRelations() {
  CouponPool.belongsTo(Coupon, {
    foreignKey: "couponId",
    targetKey: "id",
  });
  CouponPool.belongsTo(Member, {
    foreignKey: "memberId",
    targetKey: "id",
  });
}
