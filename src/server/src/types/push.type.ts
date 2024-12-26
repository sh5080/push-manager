import { CreatePushDto } from "@push-manager/shared/dtos/push.dto";

export interface CreateBasePushDto {
  dto: CreatePushDto;
  campaignCode: number;
  sendDate: () => string;
  now: () => string;
}
