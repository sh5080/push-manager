import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";
import { BaseRepository } from "../base.repository";
import { AppDataSource } from "../../configs/db.config";
import { Op } from "sequelize";

export class SubscriptionRewardRequestRepository extends BaseRepository<SubscriptionRewardRequest> {
  constructor() {
    super(AppDataSource, SubscriptionRewardRequest, SubscriptionRewardRequest);
  }
  async findByDate(startAt: Date, endAt: Date) {
    return await SubscriptionRewardRequest.findAll({
      where: {
        createdAt: {
          [Op.gte]: startAt,
          [Op.lte]: endAt,
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
