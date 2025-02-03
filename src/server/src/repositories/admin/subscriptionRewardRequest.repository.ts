import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";
import { BaseRepository } from "../base.repository";

import { Op } from "sequelize";

export class SubscriptionRewardRequestRepository extends BaseRepository<SubscriptionRewardRequest> {
  constructor() {
    super(SubscriptionRewardRequest);
  }
  async findByDate(startAt: Date, endAt: Date) {
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
