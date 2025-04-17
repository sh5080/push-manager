import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";
import { BaseRepository } from "../base.repository";

import { Op } from "sequelize";
import { CouponPool } from "../../models/admin/CouponPool";
import { Coupon } from "../../models/admin/Coupon";
import {
  GetCouponsDto,
  IMembershipAppCoupon,
  PaginatedResponse,
} from "@push-manager/shared";
import { Member } from "../../models/admin/Member";
import { Decrypted } from "../../decorators/decrypted.decorator";

export class CouponRepository extends BaseRepository<SubscriptionRewardRequest> {
  constructor() {
    super(SubscriptionRewardRequest);
  }

  @Decrypted(["memberId"], { Member: ["memNo", "ci"] })
  async getCoupons(
    dto: GetCouponsDto,
    memberId?: string
  ): Promise<PaginatedResponse<IMembershipAppCoupon>> {
    const {
      page = 1,
      pageSize = 10,
      sn,
      status,
      redeemedAtFrom,
      redeemedAtTo,
    } = dto;

    const where: any = {};

    // 쿠폰 번호 검색
    if (sn) {
      where.sn = { [Op.iLike]: `%${sn}%` };
    }

    // 상태 검색
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (redeemedAtFrom || redeemedAtTo) {
      where.redeemedAt = {
        ...(redeemedAtFrom && { [Op.gte]: redeemedAtFrom }),
        ...(redeemedAtTo && { [Op.lt]: redeemedAtTo }),
      };
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
          { model: Member, attributes: ["name", "memNo", "ci"] },
        ],
        raw: true,
        nest: true,
      }),
      CouponPool.count({ where }),
    ]);

    return {
      data: items as unknown as IMembershipAppCoupon[],
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
