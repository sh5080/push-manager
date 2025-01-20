import {
  BadRequestException,
  GetSubscriptionRewardRequestsDto,
  parseDateTime,
} from "@push-manager/shared";
import { SubscriptionRewardRequestRepository } from "../../repositories/admin/subscriptionRewardRequest.repository";
import { ISubscriptionRewardRequestService } from "../../interfaces/admin/subscriptionRewardRequest.interface";

export class SubscriptionRewardRequestService
  implements ISubscriptionRewardRequestService
{
  constructor(
    private readonly subscriptionRewardRequestRepository: SubscriptionRewardRequestRepository
  ) {}
  async getSubscriptionRewardRequests(dto: GetSubscriptionRewardRequestsDto) {
    const startAt = parseDateTime(dto.startAt);
    const endAt = parseDateTime(dto.endAt);
    return await this.subscriptionRewardRequestRepository.findByDate(
      startAt,
      endAt
    );
  }
}
