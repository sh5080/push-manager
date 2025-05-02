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
import { Decrypted } from "../../decorators/decrypted.decorator";
import { drizzle } from "../../configs/db.config";
import { coupon, couponPool, member } from "../../db/migrations/schema";
import { and, count, desc, eq, like, gte, lt } from "drizzle-orm";

export class CouponRepository extends BaseRepository<SubscriptionRewardRequest> {
  constructor() {
    super(SubscriptionRewardRequest);
  }

  @Decrypted(["memberId"], { member: ["memNo", "ci"] })
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

    const conditions = [];

    // 쿠폰 번호 검색
    if (sn) {
      conditions.push(like(couponPool.sn, `%${sn}%`));
    }

    // 상태 검색
    if (status && status !== "ALL") {
      conditions.push(eq(couponPool.status, status));
    }

    // 기간 검색
    if (redeemedAtFrom) {
      conditions.push(gte(couponPool.redeemedAt, redeemedAtFrom));
    }

    if (redeemedAtTo) {
      conditions.push(lt(couponPool.redeemedAt, redeemedAtTo));
    }

    // 회원 ID 검색
    if (memberId) {
      conditions.push(eq(couponPool.memberId, memberId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      drizzle
        .select({
          id: couponPool.id,
          sn: couponPool.sn,
          status: couponPool.status,
          issuedAt: couponPool.issuedAt,
          redeemedAt: couponPool.redeemedAt,
          startDate: couponPool.startDate,
          endDate: couponPool.endDate,
          createdAt: couponPool.createdAt,
          updatedAt: couponPool.updatedAt,
          gradeAtIssue: couponPool.gradeAtIssue,
          coupon: {
            name: coupon.name,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
          },
          member: {
            name: member.name,
            memNo: member.memNo,
            ci: member.ci,
          },
        })
        .from(couponPool)
        .innerJoin(coupon, eq(couponPool.couponId, coupon.id))
        .innerJoin(member, eq(couponPool.memberId, member.id))
        .where(whereClause)
        .limit(Number(pageSize))
        .offset(Number((page - 1) * pageSize))
        .orderBy(desc(couponPool.createdAt))
        .execute(),

      drizzle
        .select({ count: count() })
        .from(couponPool)
        .where(whereClause)
        .execute(),
    ]);

    return {
      data: items as unknown as IMembershipAppCoupon[],
      total: totalResult[0].count,
      page,
      pageSize,
      totalPages: Math.ceil(totalResult[0].count / pageSize),
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
