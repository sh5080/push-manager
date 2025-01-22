import { GetSubscriptionRewardRequestsDto } from "@push-manager/shared";
import { SubscriptionRewardRequest } from "../../models/admin/SubscriptionRewardRequest";

export interface ISubscriptionRewardRequestService {
  getSubscriptionRewardRequests(
    dto: GetSubscriptionRewardRequestsDto
  ): Promise<SubscriptionRewardRequest[]>;
}
