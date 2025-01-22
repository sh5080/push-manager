import { GetSubscriptionRewardRequestsDto } from "@push-manager/shared/dtos/admin/subscriptionRewardRequest.dto";
import { validateDto } from "@push-manager/shared/utils/validate.util";
import { BaseAPI } from "../base.api";
import { ISubscriptionRewardRequest } from "@push-manager/shared/types/entities/admin/subscriptionRewardRequest.entity";

class SubscriptionAPI extends BaseAPI {
  // 식별자 목록 조회
  async getSubscriptionRewardRequests(
    dto: GetSubscriptionRewardRequestsDto
  ): Promise<ISubscriptionRewardRequest[]> {
    const validatedDto = await validateDto(
      GetSubscriptionRewardRequestsDto,
      dto
    );
    const queryParams = new URLSearchParams();
    const { startAt, endAt } = validatedDto;
    if (startAt) {
      queryParams.append("startAt", startAt.toISOString());
    }
    if (endAt) {
      queryParams.append("endAt", endAt.toISOString());
    }
    console.log(queryParams.toString());
    return this.customFetch<ISubscriptionRewardRequest[]>(
      `/api/admin/subscription?${queryParams.toString()}`
    );
  }
}

export const subscriptionApi = new SubscriptionAPI();
