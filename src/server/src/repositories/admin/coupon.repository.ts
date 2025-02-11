import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";
import { BaseRepository } from "../base.repository";

import { Op } from "sequelize";
import { CouponPool } from "../../models/admin/CouponPool";
import { Coupon } from "../../models/admin/Coupon";
import {
  GetCouponsDto,
  IMembershipAppCoupon,
  PaginatedResponse,
  Rnum,
} from "@push-manager/shared";

export class CouponRepository extends BaseRepository<SubscriptionRewardRequest> {
  constructor() {
    super(SubscriptionRewardRequest);
  }
  async getCoupons(
    dto: GetCouponsDto,
    memberId?: string
  ): Promise<PaginatedResponse<CouponPool>> {
    const { page = 1, pageSize = 10, sn, status } = dto;

    const where: any = {};

    // 쿠폰 번호 검색
    if (sn) {
      where.sn = { [Op.iLike]: `%${sn}%` };
    }

    // 상태 검색
    if (status && status !== "ALL") {
      where.status = status;
    }

    // 회원 ID 검색
    if (memberId) {
      where.memberId = memberId;
    }

    const [items, total] = await Promise.all([
      CouponPool.findAll({
        where,
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Coupon,
            attributes: ["name", "discountType", "discountValue"],
          },
        ],
      }),
      CouponPool.count({ where }),
    ]);

    return {
      data: items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
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
}
