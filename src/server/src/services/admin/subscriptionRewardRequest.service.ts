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
    return await this.subscriptionRewardRequestRepository.findByDate(
      dto.startAt,
      dto.endAt
    );
  }
}
