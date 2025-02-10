import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";
import { BaseRepository } from "../base.repository";

import { Op } from "sequelize";
import { CouponPool } from "../../models/admin/CouponPool";
import { Coupon } from "../../models/admin/Coupon";
import { IMembershipAppCoupon } from "@push-manager/shared";

export class CouponRepository extends BaseRepository<SubscriptionRewardRequest> {
  constructor() {
    super(SubscriptionRewardRequest);
  }
  async findSubscriptionRewardRequestsByDate(startAt: Date, endAt: Date) {
    return await SubscriptionRewardRequest.findAll({
      where: {
        createdAt: {
          [Op.gte]: startAt,
          [Op.lt]: endAt,
        },
      },
      attributes: [
        "id",
        "memNo",
        "grade",
        "itemName",
        "createdAt",
        "contractSn",
        "gradeStDate",
        "itemCode",
      ],
      order: [["id", "asc"]],
    });
  }

  async getAppCouponsByMemberId(id: string): Promise<IMembershipAppCoupon[]> {
    return (await CouponPool.findAll({
      where: { memberId: id },
      include: [
        {
          model: Coupon,
        },
      ],
    })) as unknown as IMembershipAppCoupon[];
  }
}
