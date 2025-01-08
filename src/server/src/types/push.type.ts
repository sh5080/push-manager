import { CreatePushDto } from "@push-manager/shared";

export interface CreateBasePushDto {
  dto: CreatePushDto;
  campaignCode: number;
  sendDate: () => string;
  now: () => string;
}
